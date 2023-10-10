'use client';
import React from "react";

//INTRNAL IMPORT
import Style from "./search.module.css";
import { Slider, Brand } from "../../components/components-index";
import { SearchBar } from "../../SearchPage/searchPageIndex";
import { Filter } from "../../components/components-index";

import { NFTCardTwo, Banner } from "../../collectionPage/collectionIndex";
import images from "../../img";
import Navbar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";

const searchPage = () => {
    const collectionArray = [
        images.nft_image_1,
        images.nft_image_2,
        images.nft_image_3,
        images.nft_image_1,
        images.nft_image_2,
        images.nft_image_3,
        images.nft_image_1,
        images.nft_image_2,
    ];
    return (
        <div className={Style.searchPage}>
            <Navbar/>
            <Banner bannerImage={images.creatorbackground5} />
            <SearchBar />
            <Filter />
            <NFTCardTwo NFTData={collectionArray} />
            <Slider />
            <Brand />
            <Footer/>
        </div>
    );
};

export default searchPage;