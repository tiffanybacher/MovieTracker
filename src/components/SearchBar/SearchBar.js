import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <div className="SearchBar">
        <input type="text" className="search-input" placeholder="Search for a movie..."/>
      </div>
    );
  }
}

export default SearchBar;