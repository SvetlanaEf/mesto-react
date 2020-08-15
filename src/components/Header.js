import React from "react";
import logoMesto from "../images/mesto.svg";

function Header() {
  return (
    <header className="header">
      <a href="/">
        <img
          src={logoMesto}
          className="header__logo"
          alt="Логотип Места России"
        />
      </a>
    </header>
  );
}

export default Header;
