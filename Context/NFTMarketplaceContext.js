'use client';
import React, {useState, useEffect, useContext} from 'react';
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import Router from "next/router";
import axios from "axios";
import {create as ipfsHttpClient } from "ipfs-http-client";

// internal import
import {NFTMarketplaceAddress, NFTMarketplaceABI} from './constants';

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

// Fetching Smart Contracts
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
        NFTMarketplaceAddress,
        NFTMarketplaceABI,
        signerOrProvider
    );

// Connecting with smart contract
const ConnectingWithSmartContract = async()=> {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (e) {
        console.log(e);
    }
}

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({children}) => {
    const titleData = "Discover, collect, and sell NFTs";
    // usestate
    const [currentAccount, setCurrentAccount] = useState("");

    // check if wallet is connected or nah
    const checkIfWalletIsConnected = async()=> {
        try {
            if(!window.ethereum) return console.log("Install MetaMask");
            const accounts = await window.ethereum.request({
                method: 'eth_accounts'
            });
            if(accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No account found");
            }
            console.log(currentAccount);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, []);

    // Connect Wallet Btn
    const connectWallet = async()=> {
        try {
            if(!window.ethereum) return console.log("Install MetaMask");
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    }

    // Upload to IPFS
    const uploadToIPFS = async(file)=>{
        try {
            const added = await client.add({ content: file });
            const url = 'https://ipfs.infura.io/ipfs/${added.path}';
            return url;
        }catch (e) {
            console.log(e);
        }
    }

    // Create NFT
    const createNFT = async(formInput, fileUrl, router) => {
       try {
           const {name, description, price} = formInput;
           if(!name || !description || !price || !fileUrl)
               return console.log("Data missing");

           try {
               const added = await client.add(data);
               const url = "https://ipfs.infura.io/ipfs/${added.path}";
               await createSale(url, price);
           } catch (e) {

           }
       } catch (e) {
           console.log("Error while creating NFT");
       }
    }

    // Create Sale function
    const createSale = async (url, formInputPrice, isReselling, id) => {
        try {
            const price = ethers.utils.parseUnits(formInputPrice, 'ether');
            const contract = await ConnectingWithSmartContract();

            const listingPrice = contract.getListingPrice();
            const transaction = !isReselling
                ? await contract.createToken(url, price, {
                    value: listingPrice.toString()
                })
                : await contract.reSellToken(url, price, {
                value: listingPrice.toString(),
                });
            await transaction.wait();
        } catch {
            console.log("Error while creating SALE");
        }
    }

    // Fetch NFTs function
    const fetchNFTs = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const data = await contract.fetchMarketItem();
            // console.log(data);

            const items = await Promise.all(
                data.map(async({ tokenId, seller, owner, price: unformattedPrice})=>{
                    const tokenUri = await contract.tokenURI(tokenId);
                    const {
                        data: {
                            image, name, description,
                        },
                    }= await axios.get(tokenUri);


                        const price = ethers.utils.formatUnits(
                            unformattedPrice.toString(),
                            'ether'
                        );

                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenUri,
                    }
                    }
                )

            );
            return items;
        } catch (e) {
            console.log("Error while fetching NFT");
        }
    }

    // Fetch my NFT or listed NFTs
    const fetchMyNFTsOrListedNFTs = async(type)=> {
        try {
            const contract = await connectingWithSmartContract();
            const data = type == "fetchItemsListed"
                ? await contract.fetchItemsListed()
                : await contract.fetchMyNft();

            const items = await Prmise.all(
                data.map(async ({tokenId, seller, owner, price: unformattedPrice}) => {
                    const tokenURI = contract.tokenURI(tokenId);
                    const {
                        data: {
                            image, name, description,
                        },
                    } = await axios.get(tokenURI);
                    const price =ethers.utils.formatUnits(
                        unformattedPrice.toString(),
                        'ether'
                    );
                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI,
                    }
                })
            );
            return items;
        } catch {
            console.log("Error while fetching listed NFTs");

        }
    }

    // Allow user to BUY NFT
    const buyNFT = async (nft)=> {
        try {
            const contract = await connectingWithSmartContract();
            const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price,
            });
            await transaction.wait();
        } catch (e) {
            console.log("Error while buying NFTs");
        }
    }

    return (
        <NFTMarketplaceContext.Provider
            value={{
                checkIfWalletIsConnected,
                connectWallet,
                titleData,
                uploadToIPFS,
                createNFT,
                fetchNFTs,
                buyNFT,
                currentAccount,
                fetchMyNFTsOrListedNFTs
            }}
        >
         {children}
        </NFTMarketplaceContext.Provider>
    );
};