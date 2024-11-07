import React from "react";
import './BlockMenuStudent.css'
import logo from '../../images/LOGO.png'

export const BlockMenuStudent = () => {
    return(
        <>
        <div className="leftBlock">
        <a href="/" className="header_logo_link">
                            <img src={logo} alt="logo" className="header_logo_pic" />
                        </a>

        </div>
        </>
    );
}