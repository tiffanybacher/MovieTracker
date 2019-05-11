import React from 'react';
import Nav from '../../containers/Nav/Nav';
import SearchBar from '../../containers/SearchBar/SearchBar';

const Header = () => {
  return (
    <header>
      <Nav />
      <SearchBar />
    </header>
  );
}

export default Header;