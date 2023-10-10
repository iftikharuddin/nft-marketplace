'use client';

import React from "react";

//INTERNAL IMPORT
import Style from "./collection.module.css";
import images from "../../img";
import {
    Banner,
    CollectionProfile,
    NFTCardTwo,
} from "../../collectionPage/collectionIndex";
import { Slider, Brand } from "../../components/components-index";
import Filter from "../../components/Filter/Filter";
import Navbar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";

const collection = () => {
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
        <div className={Style.collection}>
            <Navbar/>
            <Banner bannerImage={images.creatorbackground1} />
            <CollectionProfile />
            <Filter />
            <NFTCardTwo NFTData={collectionArray} />
            <Slider />
            <Brand />
            <Footer/>
        </div>
    );
};

export default collection;