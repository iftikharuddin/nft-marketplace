'use client';
import React, { useEffect, useState, useContext } from "react";

//INTRNAL IMPORT
import Style from "./search.module.css";
import { Slider, Brand } from "../../components/components-index";
import { SearchBar } from "../../SearchPage/searchPageIndex";
import { Filter } from "../../components/components-index";

import { NFTCardTwo, Banner } from "../../collectionPage/collectionIndex";
import images from "../../img";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import Navbar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";

const searchPage = () => {
    const { fetchNFTs, setError, currentAccount } = useContext(
        NFTMarketplaceContext
    );
    const [nfts, setNfts] = useState([]);
    const [nftsCopy, setNftsCopy] = useState([]);

    useEffect(() => {
        try {
            // if (currentAccount) {
            fetchNFTs().then((items) => {
                setNfts(items.reverse());
                setNftsCopy(items);
            });
            // }
        } catch (error) {
            setError("Please reload the browser", error);
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
    //   images.nft_image_1,
    //   images.nft_image_2,
    //   images.nft_image_3,
    //   images.nft_image_1,
    //   images.nft_image_2,
    //   images.nft_image_3,
    //   images.nft_image_1,
    //   images.nft_image_2,
    // ];
    return (
        <div className={Style.searchPage}>
            <Navbar/>
            <Banner bannerImage={images.creatorbackground2} />
            <SearchBar
                onHandleSearch={onHandleSearch}
                onClearSearch={onClearSearch}
            />
            <Filter />
            <NFTCardTwo NFTData={nfts} />
            <Slider />
            <Brand />
            <Footer/>
        </div>
    );
};

export default searchPage;
