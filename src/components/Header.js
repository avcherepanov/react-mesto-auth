import React from 'react';
import headerLogo from '../images/logo.svg';


function Header(props) {
  return (
    <header className="header">
        <img src={headerLogo} alt="Логотип" className="header__logo"/>
        {props.children}
    </header>
  );
}

export default Header;