'use client';
import Image from 'next/image';
import {Navbar, Footer, HeroSection} from "../components/components-index";

const MyApp = ({Component, pageProps}) => (
    <div>
        <Navbar/>
        <HeroSection/>
        <Footer/>
    </div>
);

export default MyApp;
