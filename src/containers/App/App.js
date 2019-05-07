import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import './App.css';
import { fetchDiscover } from '../../api/fetchDiscover';
import { cleanDiscover } from '../../api/cleaners';
import { addDiscoverMovies } from '../../actions';
import MovieContainer from '../MovieContainer/MovieContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: ''
    }
  }
  
  componentDidMount() {
    return fetchDiscover()
      .then(response => cleanDiscover(response.results))
      .then(movies => this.props.addDiscoverMovies(movies))
      .catch(error => this.setState({error: error.message}));
  }
  
  render() {
    return(
      <div className="App">
        <h1>OUR APP</h1>
        {/* <Header /> */}
        <Switch>
          <Route exact path='/' component={MovieContainer}/>
        </Switch> 
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies
});

const mapDispatchToProps = (dispatch) => ({
  addDiscoverMovies: (movies) => dispatch(addDiscoverMovies(movies))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
