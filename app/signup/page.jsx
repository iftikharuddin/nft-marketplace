'use client';
import React from "react";

//INTERNAL IMPORT
import Style from "./signup.module.css";
import LoginAndSignUp from "../../loginAndSignUp/loginAndSignUp";

const page = () => {
    return (
        <div className={Style.login}>
            <div className={Style.login_box}>
                <h1>SignUp</h1>
                <LoginAndSignUp />
                <p className={Style.login_box_para}>
                    New user? <a href="#">Create an account</a>
                </p>
            </div>
        </div>
    );
};

export default page;