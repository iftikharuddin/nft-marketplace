'use client';
import React from "react";

//INTERNAL IMPORT
import { Button, Category, Brand } from "../../components/components-index";
import NFTDetailsPage from "../../NFTDetailsPage/NFTDetailsPage";
import Navbar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";
const NFTDetails = () => {
    return (
        <div>
            <Navbar/>
            <NFTDetailsPage />
            <Category />
            <Brand />
            <Footer/>
        </div>
    );
};

export default NFTDetails;