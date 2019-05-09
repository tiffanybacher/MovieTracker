import React from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import { connect } from 'react-redux';

const MovieContainer = (props) => {
  const movieCards = props.movies.map(movie => <MovieCard {...movie} key={movie.id} />);

  return (
    <div className="MovieContainer">
      <h2 className="movie-container-header">Explore Popular Movies</h2>
      <section className="flex-container">
        {movieCards}
      </section>
    </div>
  );
}

const mapStoreToProps = (state) => ({
  movies: state.movies
});

export default connect(mapStoreToProps)(MovieContainer);