import React from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import { connect } from 'react-redux';

const MovieContainer = (props) => {
  const movieCards = props.movies.map(movie => <MovieCard {...movie} key={movie.id} />);

  return (
    <section className="MovieContainer">
      {movieCards}
    </section>
  );
}

const mapStoreToProps = (state) => ({
  movies: state.movies
});

export default connect(mapStoreToProps)(MovieContainer);