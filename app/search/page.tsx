'use client';
import React, { useEffect, useState, useContext } from "react";

//INTRNAL IMPORT
import Style from "./search.module.css";
import { Slider, Brand } from "../../components/components-index";
import { SearchBar } from "../../SearchPage/searchPageIndex";
import { Filter } from "../../components/components-index";

import { NFTCardTwo, Banner } from "../../collectionPage/collectionIndex";
import images from "../../img";
import Navbar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";

import {NFTMarketplaceContext} from '../../Context/NFTMarketplaceContext';
import Title from "../../components/Title/Title";

const searchPage = () => {
    const { fetchNFTs, setError, currentAccount } = useContext(
        NFTMarketplaceContext
    );
    const [nfts, setNfts] = useState([]);
    const [nftsCopy, setNftsCopy] = useState([]);

    useEffect(() => {
        try {
            // if (items) {
                fetchNFTs().then((items) => {
                    console.log(items);
                    setNfts(items.reverse());
                    setNftsCopy(items);
                    console.log(nfts);
                });
            // }
        } catch (error) {
            console.log("Please reload the browser", error);
        }
    }, []);

    const onHandleSearch = (value) => {
        const filteredNFTS = nfts.filter(({ name }) =>
            name.toLowerCase().includes(value.toLowerCase())
        );

        if (filteredNFTS.length === 0) {
            setNfts(nftsCopy);
        } else {
            setNfts(filteredNFTS);
        }
    };

    const onClearSearch = () => {
        if (nfts.length && nftsCopy.length) {
            setNfts(nftsCopy);
        }
    };

    // const collectionArray = [
    //     images.nft_image_1,
    //     images.nft_image_2,
    //     images.nft_image_3,
    //     images.nft_image_1,
    //     images.nft_image_2,
    //     images.nft_image_3,
    //     images.nft_image_1,
    //     images.nft_image_2,
    // ];
    return (
        <div className={Style.searchPage}>
            <Navbar/>
            <Banner bannerImage={images.creatorbackground5} />
            <SearchBar onHandleSearch={onHandleSearch}
                       onClearSearch={onClearSearch}/>
            <Filter />
            <Title heading="Fetch NFTss"/>
            <NFTCardTwo NFTData={nfts} />
            <Slider />
            <Brand />
            <Footer/>
        </div>
    );
};

export default searchPage;