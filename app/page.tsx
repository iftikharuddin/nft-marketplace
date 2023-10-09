'use client';
import Image from 'next/image';
import {Navbar, Footer, HeroSection, Service, BigNFTSilder, Subscribe, Title} from "../components/components-index";
import Style from "./globals.css";

const MyApp = ({Component, pageProps}) => (
    <div className={Style.homePage}>
        <Navbar/>
        <HeroSection/>
        <Service/>
        <BigNFTSilder/>
         <Title heading="Browse by category" paragraph="para goes here" />
        <Subscribe/>
        <Footer/>
    </div>
);

export default MyApp;
