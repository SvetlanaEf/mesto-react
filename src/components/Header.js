import React from "react";
import logoMesto from "../images/mesto.svg";
import { useLocation, Link } from 'react-router-dom';

const loginPath = '/sign-in';
const registerPath = '/sign-up';

function Header({ userEmail, onLogout }) {
  const { pathname } = useLocation();
  const isLoginPage = pathname === loginPath;
  const isRegisterPage = pathname === registerPath;

  return (
    <header className="header">
      <a href="/">
        <img
          src={logoMesto}
          className="header__logo"
          alt="Логотип Места России"
        />
      </a>

      <div className="header__auth">
        {(isLoginPage || isRegisterPage) && (
          <Link className="header__auth-button" to={isLoginPage ? registerPath : loginPath}>
            {isLoginPage ? 'Регистрация' : 'Вход'}
          </Link>
        )}

        {userEmail && (
          <>
            <span className="header__auth-email">{userEmail}</span>
            <button className="header__auth-button" onClick={onLogout}>Выйти</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
