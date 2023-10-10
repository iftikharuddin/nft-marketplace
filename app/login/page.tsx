'use client';
import React from "react";

//INTERNAL IMPORT
import Style from "./login.module.css";
import LoginAndSignUp from "../../loginAndSignUp/loginAndSignUp";
import Navbar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";

const login = () => {
    return (
        <div className={Style.login}>
            <Navbar/>
            <div className={Style.login_box}>
                <h1>Login</h1>
                <LoginAndSignUp />
                <p className={Style.login_box_para}>
                    New user? <a href="#">Create an account</a>
                </p>
            </div>
            <Footer/>
        </div>
    );
};

export default login;