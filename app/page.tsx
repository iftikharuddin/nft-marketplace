'use client';
import Image from 'next/image';
import {Navbar, Footer, HeroSection, Service} from "../components/components-index";

const MyApp = ({Component, pageProps}) => (
    <div>
        <Navbar/>
        <HeroSection/>
        <Service/>
        <Footer/>
    </div>
);

export default MyApp;
