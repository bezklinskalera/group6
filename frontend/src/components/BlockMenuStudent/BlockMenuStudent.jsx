import React, { useState } from "react";
import "./BlockMenuStudent.css";
import logo from '../../images/logoSvg.svg';

export const BlockMenuStudent = ({ menuItems }) => {
    const [activeItem, setActiveItem] = useState(null);

    const handleClick = (item) => {
        setActiveItem(item);
        const elementId = item.toLowerCase().replace(/\s+/g, '-'); // Перетворює назву в id
        console.log(elementId)
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' }); // Прокрутка до елемента
        }
    };

    return (
        <div className="vertical-header">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <nav className="menu">
                <ul>
                    {menuItems.map((item, index) => (
                        <li
                            key={index}
                            className={`menu-item ${activeItem === item ? 'active' : ''}`}
                            onClick={() => handleClick(item)}
                        >
                            <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
