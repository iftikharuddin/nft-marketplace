'use client';
import Image from 'next/image';
import {Navbar, Footer, HeroSection, Service, BigNFTSilder} from "../components/components-index";

const MyApp = ({Component, pageProps}) => (
    <div>
        <Navbar/>
        <HeroSection/>
        <Service/>
        <BigNFTSilder/>
        <Footer/>
    </div>
);

export default MyApp;
