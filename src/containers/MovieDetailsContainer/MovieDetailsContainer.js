import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchMoviePeople from '../../api/fetchMoviePeople';
import { cleanPeople } from '../../api/cleaners';
import { MovieDetails } from '../../components/MovieDetails/MovieDetails.js';

export class MovieDetailsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: {},
      movieId: props.location.pathname.split("/")[2],
    }
  }


  componentDidMount() {
    const { movieId } = this.state;

    fetchMoviePeople(movieId)
    .then(data => cleanPeople(data))
    .then(people => this.setState({ people }));
  }
  
  render() {
    const movie = this.props.movies.find(movie => movie.id == this.state.movieId);
    const { people } = this.state;

    return (
      <article>
        {movie && people &&
          <MovieDetails 
            movieDetails={movie}
            people={people}
          />}
      </article>
    );
  }
}

export const mapStateToProps = (state) =>  ({
  movies: state.movies
});

export default connect(mapStateToProps)(MovieDetailsContainer);

MovieDetailsContainer.propTypes = {
  ispatch: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  movies: PropTypes.array
};