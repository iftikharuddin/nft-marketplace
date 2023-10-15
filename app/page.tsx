'use client';
import React, { useState, useEffect, useContext } from "react";
import Image from 'next/image';

import {
    HeroSection,
    Service,
    BigNFTSilder,
    Subscribe,
    Title,
    Category,
    Filter,
    NFTCard,
    // Collection,
    AudioLive,
    FollowerTab,
    Slider,
    Brand,
    Video,
    Loader,
} from "../components/components-index";

import {getTopCreators} from "../TopCreators/TopCreators";

import Style from "./globals.css";

// importing contract data
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import Navbar from "../components/NavBar/navbar";
import Footer from "../components/Footer/footer";
import {NFTCardTwo} from "../collectionPage/collectionIndex";

const MyApp = ({Component, pageProps}) => {
    const { fetchNFTs } = useContext(NFTMarketplaceContext);
    const [nfts, setNfts] = useState([]);
    const [nftsCopy, setNftsCopy] = useState([]);

    // get top creators
    const topCreators = getTopCreators(nfts);

    useEffect(() => {
        // if (currentAccount) {
        fetchNFTs().then((items) => {
            console.log(nfts);
            setNfts(items.reverse());
            setNftsCopy(items);
        });
        // }
    }, []);
    return(
        <div className={Style.homePage}>
            <Navbar/>
            <HeroSection/>
            <Service/>
            <BigNFTSilder/>
            {topCreators.length == 0 ? (
                <Loader />
            ) : (
                <FollowerTab topCreators={topCreators} />
            )}
            <Slider/>
            {/*<Collection/>*/}
            <Title heading="Filter" paragraph="filter by nfts" />
            <Filter/>
            <Title heading="Audio" paragraph="Audio nfts" />
            <AudioLive/>
            <Title heading="Browse by category" paragraph="category section" />
            <Category/>
            <Subscribe/>
            {nfts.length == 0 ? <Loader /> : <NFTCard NFTData={nfts} />}
            <Video/>
            <Brand/>
            <Footer/>
        </div>
    );
}
export default MyApp;
