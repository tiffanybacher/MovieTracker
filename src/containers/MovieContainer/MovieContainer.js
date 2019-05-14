import React from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import { connect } from 'react-redux';
import { updateUserFavorites, deleteUserFavorite } from '../../actions';
import { fetchDeleteFavorite } from '../../thunks/fetchDeleteFavorite';

export const MovieContainer = (props) => {
  const movieCards = props.movies.map(movie => 
    <MovieCard 
      {...movie} 
      user={props.user} 
      updateUserFavorites={props.updateUserFavorites} 
      deleteUserFavorite={props.deleteUserFavorite}
      key={movie.id} 
    />);

  return (
    <div className="MovieContainer">
      <h2 className="movie-container-header">Explore Popular Movies</h2>
      <section className="flex-container">
        {movieCards}
      </section>
    </div>
  );
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
  user: state.user
});

export const mapDispatchToProps = (dispatch) => ({
  updateUserFavorites: (movieId) => dispatch(updateUserFavorites(movieId)),
  deleteUserFavorite: (userId, movieId) => dispatch(fetchDeleteFavorite(userId, movieId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer);