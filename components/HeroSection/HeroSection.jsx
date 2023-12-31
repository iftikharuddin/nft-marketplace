import React, {useContext, useEffect, useState} from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./HeroSection.module.css";
import { Button } from "../components-index";
import images from "../../img";

// Smart contract import
import {NFTMarketplaceContext} from "../../Context/NFTMarketplaceContext";

const HeroSection = () => {
    const {checkIfWalletIsConnected} = useContext(NFTMarketplaceContext);
    const {titleData} = useContext(NFTMarketplaceContext);
    useEffect(()=>{
        checkIfWalletIsConnected()
    }, []);
    return (
        <div className={Style.heroSection}>
            <div className={Style.heroSection_box}>
                <div className={Style.heroSection_box_left}>
                    <h1> {titleData} 🖼️</h1>
                    <p>
                        Discover the most outstanding NTFs in all topics of life. Creative
                        your NTFs and sell them
                    </p>
                    <Button btnName="Start your search" />
                </div>
                <div className={Style.heroSection_box_right}>
                    <Image
                        src={images.hero}
                        alt="Hero section"
                        width={600}
                        height={600}
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;