import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="Nav">
      <img src="" alt="Logo"/>
      <div className="main-nav-wrapper">
        <NavLink to="/" className="nav-link">DISCOVER</NavLink>
        <NavLink to="/favorites" className="nav-link">FAVORITES</NavLink>
        <NavLink to="/watchlist" className="nav-link">WATCHLIST</NavLink>
      </div>
      <div className="account-wrapper">
        <p className="login-link nav-link">LOGIN</p>
        <NavLink to="/signup" className="nav-link">SIGN UP</NavLink>
      </div>
    </nav>
  );
}

export default Nav;