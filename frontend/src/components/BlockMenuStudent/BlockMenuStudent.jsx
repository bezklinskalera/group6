// import React from "react";
// import './BlockMenuStudent.css'
// import logo from '../../images/LOGO.png'
//
// export const BlockMenuStudent = () => {
//     return(
//         <>
//         <div className="leftBlock">
//         <a href="/" className="header_logo_link">
//                             <img src={logo} alt="logo" className="header_logo_pic" />
//                         </a>
//
//         </div>
//         </>
//     );
// }
import React, { useState } from "react";
import "./BlockMenuStudent.css";
import logo from '../../images/logoSvg.svg'

export const BlockMenuStudent = ({ menuItems }) => {
    const [activeItem, setActiveItem] = useState(null);

    const handleClick = (item) => {
        setActiveItem(item);
        document.getElementById(item.toLowerCase().replace(/\s+/g, '-')).scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div className="vertical-header">
            <div className="logo">
                <img src={logo} alt="Logo"/>
            </div>

            <nav className="menu">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className={`menu-item ${activeItem === item ? 'active' : ''}`}
                            onClick={() => handleClick(item)}>
                            <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
