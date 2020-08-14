import React from "react";
import LogoMesto from "../images/mesto.svg";

function Header() {
  return (
    <header className="header">
      <a href="/">
        <img
          src={LogoMesto}
          className="header__logo"
          alt="Логотип Места России"
        />
      </a>
    </header>
  );
}

export default Header;
