'use client';
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/navigation';

//INTERNAL IMPORT
import { Button, Category, Brand } from "../../components/components-index";
import NFTDetailsPage from "../../NFTDetailsPage/NFTDetailsPage";

//IMPORT SMART CONTRACT DATA
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";

const NFTDetails = () => {
    const { currentAccount } = useContext(NFTMarketplaceContext);

    const [nft, setNft] = useState({
        image: "",
        tokenId: "",
        name: "",
        owner: "",
        price: "",
        seller: "",
    });

    const router = useRouter();
    console.log("Query:", router.query);

    useEffect(() => {
        if (!router.isReady) return;
        setNft(router.query);
    }, [router.isReady]);

    return (
        <div>
            <Navbar/>
            <NFTDetailsPage nft={nft} />
            <Category />
            <Brand />
            <Footer/>
        </div>
    );
};

export default NFTDetails;
