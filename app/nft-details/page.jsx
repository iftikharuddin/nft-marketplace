'use client';
import React, { useEffect, useState, useContext } from "react";
import { useParams, useRouter, useSearchParams, usePathname } from 'next/navigation';

//INTERNAL IMPORT
import { Button, Category, Brand } from "../../components/components-index";
import NFTDetailsPage from "../../NFTDetailsPage/NFTDetailsPage";

//IMPORT SMART CONTRACT DATA
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import Navbar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";

const NFTDetails = () => {
    const { currentAccount } = useContext(NFTMarketplaceContext);

    // Todo: this was just a tricky fix, find proper solution using router
    const param = useSearchParams();
    const [nft, setNft] = useState({
        image: param.get("image"),
        tokenId: param.get("tokenId"),
        name: param.get("name"),
        owner: param.get("owner"),
        price: param.get("price"),
        seller: param.get("seller"),
    });

    // const router = useRouter();
    //
    // useEffect(() => {
    //     if (!router.isReady) return;
    //     setNft(router.query);
    // }, [router.isReady]);

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
