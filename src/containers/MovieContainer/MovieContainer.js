import React from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import { connect } from 'react-redux';
import { updateUserFavorites } from '../../actions';

const MovieContainer = (props) => {
  
  const movieCards = props.movies.map(movie => <MovieCard {...movie} user={props.user} updateUserFavorites={props.updateUserFavorites} key={movie.id} />);

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
  movies: state.movies,
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  updateUserFavorites: (movieId) => dispatch(updateUserFavorites(movieId))
})

export default connect(mapStoreToProps, mapDispatchToProps)(MovieContainer);