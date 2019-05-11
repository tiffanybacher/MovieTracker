import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../../thunks/fetchMovies';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      query: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchSearch('search', this.state.query);
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value})
  }

  clearInput = () => {
    this.setState({ query: '' });
  }


  render() {
    return (
      <form 
        className="SearchBar"
        onSubmit={this.handleSubmit}
      >
        <i className="fas fa-search"></i>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search for a movie..."
          value={this.state.query}
          onChange={this.handleChange}
        />
        <i 
          className="fas fa-times"
          role="button"
          onClick={this.clearInput}
        ></i>
      </form>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  fetchSearch: (fetchCase, query) => dispatch(fetchMovies(fetchCase, query))
})

export default connect(null, mapDispatchToProps)(SearchBar);