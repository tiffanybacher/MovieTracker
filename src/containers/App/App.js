import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import Header from '../../components/Header/Header';
import MovieContainer from '../MovieContainer/MovieContainer';
import SignUpForm from '../SignUpForm/SignUpForm';
import MovieDetailsContainer from '../MovieDetailsContainer/MovieDetailsContainer.js';
import Footer from '../../components/Footer/Footer';
import { fetchMovies } from '../../thunks/fetchMovies';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      error: ''
    }
  }
  
  componentDidMount() {
    this.props.setMovies('discover');
  }
  
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={MovieContainer} />
          <Route exact path="/search" component={MovieContainer} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route path="/movie/:id" component={MovieDetailsContainer} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  movies: state.movies
});

export const mapDispatchToProps = (dispatch) => ({
  setMovies: (fetchCase) => dispatch(fetchMovies(fetchCase))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
