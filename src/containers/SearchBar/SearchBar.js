import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSearch } from '../../thunks/fetchSearch';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      query: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchSearch(this.state.query);
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value})
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
          onChange={this.handleChange}
        />
        <i className="fas fa-times"></i>
      </form>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  fetchSearch: (query) => dispatch(fetchSearch(query))
})

export default connect(null, mapDispatchToProps)(SearchBar);