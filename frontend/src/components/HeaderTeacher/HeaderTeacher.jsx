import React from "react";
import "./HeaderTeacher.css";
import logo from "../../images/LOGO.svg"; // Імпорт логотипа
import icon_account from "../../images/Icon_account.svg"; // Імпорт логотипа
const HeaderTeacher = () => {
    return (
        <header className="header">
            <div className="header__container _container">
                <a href="" className="header__logo">
                    <img src={logo} alt="KPI DASH"/>
                </a>
                <nav className="header__menu menu">
                    <ul className="menu__list">
                        <li className="menu__item">
                            <a href="#all-groups" className="menu__link">
                                Всі групи
                            </a>
                        </li>
                        <li className="menu__item">
                            <a href="#tv-21" className="menu__link">
                                ТВ-21
                            </a>
                        </li>
                        <li className="menu__item">
                            <a href="#tv-22" className="menu__link">
                                ТВ-22
                            </a>
                        </li>
                        <li className="menu__item">
                            <a href="#tv-23" className="menu__link">
                                ТВ-23
                            </a>
                        </li>
                    </ul>

                </nav>
                <a href="" className="header__icon">
                    <img src={icon_account} alt="icon_account"/>
                </a>
            </div>
        </header>
    );
};

export default HeaderTeacher;
