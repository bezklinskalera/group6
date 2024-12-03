import React from "react";
import "./HeaderStandart.css"; // CSS для стилизации
import logo from "../../images/LOGO.svg";
import iconAccount from "../../images/Icon_account.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <img src={logo} alt="Логотип" className="header__logo" />
        <img src={iconAccount} alt="Иконка аккаунта" className="header__icon" />
      </div>
    </header>
  );
};

export default Header;
