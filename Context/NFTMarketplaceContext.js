'use client';
import React, {useState, useEffect, useContext} from 'react';
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import { useRouter } from "next/navigation";
import axios from "axios";
import {create as ipfsHttpClient } from "ipfs-http-client";
import { BrowserProvider } from "ethers";

// internal import
import {NFTMarketplaceAddress, NFTMarketplaceABI} from './constants';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID; // configure this in next.config or env

// todo: make these keys (Consider using Next.js API routes to isolate any service-oriented business logic to the server-side of things.)

const projectSecretKey = process.env.NEXT_PUBLIC_PROJECT_SECRET_KEY; // configure this in next.config or env

// const auth = "Basic" + (Buffer.from(`{projectId}:{projectSecretKey}`).toString("base64"));
const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecretKey).toString("base64");

// todo: make these keys (Consider using Next.js API routes to isolate any service-oriented business logic to the server-side of things.)

const subdomain = process.env.NEXT_PUBLIC_SUBDOMAIN; // configure this in next.config or env
const client = ipfsHttpClient(
    {
        host: "infura-ipfs.io",
        port: 5001,
        protocol: "https",
        headers: {
            authorization:auth,
        },
    });

    // https://ipfs.infura.io:5001
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
        // const provider = new ethers.providers.Web3Provider(connection);
        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (e) {
        console.log('Error Connecting with Smart Contract', e);
    }
}

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({children}) => {
    const titleData = "Discover, collect, and sell NFTs";
    // usestate
    const [error, setError] = useState("");
    const [openError, setOpenError] = useState(false);
    const [currentAccount, setCurrentAccount] = useState("");
    const router = useRouter();
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
            // window.location.reload();
        } catch (e) {
            console.log(e);
        }
    }

    // Upload to IPFS
    const uploadToIPFS = async(file)=>{
        try {
            const added = await client.add({ content: file });
            const url = `${subdomain}/ipfs/${added.path}`;
            return url;
        }catch (e) {
            console.log(e);
        }
    }

    //---CREATENFT FUNCTION
    const createNFT = async (name, price, image, description, router) => {
        if (!name || !description || !price || !image)
            return setError("Data Is Missing"), setOpenError(true);

        const data = JSON.stringify({ name, description, image });

        try {
            const added = await client.add(data);
            const url = `${subdomain}/ipfs/${added.path}`;

            await createSale(url, price);
            router.push("/search");
        } catch (error) {
            setError("Error while creating NFT");
            setOpenError(true);
        }
    };

    //--- createSale FUNCTION
    const createSale = async (url, formInputPrice, isReselling, id) => {
        try {
            console.log(url, formInputPrice, isReselling, id);
            const price = ethers.parseUnits(formInputPrice, "ether");
            const contract = await ConnectingWithSmartContract();

            // const listingPrice = await contract.getListingPrice();
            const listingPrice = 25000000000000000; // todo wth is not fetching via contract
            console.log(listingPrice);
            console.log(listingPrice.toString());

            const transaction = !isReselling
                ? await contract.createToken(url, price, {
                    value: listingPrice.toString(),
                })
                : await contract.resellToken(id, price, {
                    value: listingPrice.toString(),
                });

            await transaction.wait();
            console.log(transaction);
        } catch (error) {
            setError("error while creating sale");
            setOpenError(true);
            console.log(error);
        }
    };

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
            const contract = await ConnectingWithSmartContract();
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
            const contract = await ConnectingWithSmartContract();
            const price = ethers.utils.parseUnitss(nft.price.toString(), 'ether');
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