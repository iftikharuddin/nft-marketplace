'use client';
import Image from 'next/image';
import {
        Navbar, Footer, HeroSection,
        Service, BigNFTSilder, Subscribe,
        Title,
        Category, Filter, NFTCard,
        Collection, FollowerTab, AudioLive, Slider, Brand, Video} from "../components/components-index";
import Style from "./globals.css";

const MyApp = ({Component, pageProps}) => (
    <div className={Style.homePage}>
        <Navbar/>
        <HeroSection/>
        <Service/>
        <BigNFTSilder/>
        <Title heading="New Collection" paragraph="filter by collection" />
        <Collection/>
        <FollowerTab/>
        <Slider/>
        <Title heading="Filter" paragraph="filter by nfts" />
        <Filter/>
        <Title heading="Audio" paragraph="Audio nfts" />
        <AudioLive/>
        <Title heading="Browse by category" paragraph="category section" />
        <Category/>
        <Subscribe/>
        <NFTCard/>
        <Title heading="Videos" paragraph="Video section" />
        <Video/>
        <Brand/>
        <Footer/>

    </div>
);

export default MyApp;
