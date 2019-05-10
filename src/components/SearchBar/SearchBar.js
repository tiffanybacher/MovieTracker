import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <div className="SearchBar">
        <i class="fas fa-search"></i>
        <input type="text" className="search-input" placeholder="Search for a movie..."/>
      </div>
    );
  }
}

export default SearchBar;