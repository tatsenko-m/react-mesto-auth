import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';

function Header({ onSignOut, email }) {
  return (
    <header className="header">
        <img
          className="header__logo"
          src={headerLogo}
          alt="Логотип Mesto"
        />
        <Routes>
          <Route path="/sign-in" element={<Link className="header__link" to="/sign-up">Регистрация</Link>} />
          <Route path="/sign-up" element={<Link className="header__link" to="/sign-in">Войти</Link>} />
          <Route path="/" element=
            {
              <div className="header__menu-bar">
                <p className="header__email">{email}</p>
                <button className="header__signout-button" type="button" onClick={onSignOut}>Выйти</button>
              </div>
            } 
          />
        </Routes>
      </header>
  );
}

export default Header;