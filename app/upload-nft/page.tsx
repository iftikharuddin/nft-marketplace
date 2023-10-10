'use client';
import React from "react";

//INTERNAL IMPORT
import Style from "./upload-nft.module.css";
import { UploadNFT } from "../../UploadNFT/uploadNFTIndex";
import Navbar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";

const uploadNFT = () => {
    return (
        <div className={Style.uploadNFT}>
            <Navbar/>
            <div className={Style.uploadNFT_box}>
                <div className={Style.uploadNFT_box_heading}>
                    <h1>Create New NFT</h1>
                    <p>
                        You can set preferred display name, create your profile URL and
                        manage other personal settings.
                    </p>
                </div>

                <div className={Style.uploadNFT_box_title}>
                    <h2>Image, Video, Audio, or 3D Model</h2>
                    <p>
                        File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
                        GLB, GLTF. Max size: 100 MB
                    </p>
                </div>

                <div className={Style.uploadNFT_box_form}>
                    <UploadNFT />
                </div>
            </div>
            <Footer/>
        </div>

    );
};

export default uploadNFT;