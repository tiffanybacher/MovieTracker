import React from 'react';
import Nav from '../../containers/Nav/Nav';
import SearchBar from '../SearchBar/SearchBar';

const Header = () => {
  return (
    <header>
      <Nav />
      <SearchBar />
    </header>
  );
}

export default Header;