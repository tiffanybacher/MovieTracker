import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { fetchMovies } from '../../thunks/fetchMovies';

export class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      query: ''
    }
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchSearch('search', this.state.query);
    this.props.history.push("/search");
  }

  clearInput = () => {
    this.setState({ query: '' });
  }


  render() {
    return (
      <form className="SearchBar" onSubmit={this.handleSubmit}>
        <div role="button" className="clear-search">
          <i
            className="fas fa-times"
            onClick={this.clearInput}
          />
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search for a movie..."
          value={this.state.query}
          onChange={this.handleChange}
        />
        <div className="search-icon">
        <i className="fas fa-search" />
        </div>
        
      </form>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  fetchSearch: (fetchCase, query) => dispatch(fetchMovies(fetchCase, query))
})

export default connect(null, mapDispatchToProps)(withRouter(SearchBar));