import React from 'react';
import PropTypes from 'prop-types'
import MovieCard from '../../components/MovieCard/MovieCard';
import { connect } from 'react-redux';
import { updateUserFavorites, deleteUserFavorite } from '../../actions';
import { fetchDeleteFavorite } from '../../thunks/fetchDeleteFavorite';

export const MovieContainer = (props) => {
  let header;
  let message;
  const movieCards = props.movies.map(movie => 
    <MovieCard 
      {...movie} 
      user={props.user} 
      updateUserFavorites={props.updateUserFavorites} 
      deleteUserFavorite={props.deleteUserFavorite}
      key={movie.id} 
    />);
    
  if (props.location.pathname === '/favorites') {

    header = 'Your Favorite Movies'
  } else if (props.location.pathname === '/watchlist') {
    header = 'Your Watchlist'
  } else {
    header = 'Explore Popular Movies'
  }

  if (props.location.pathname === '/favorites' && !props.movies.length) {
    message = <h3 className="display-msg">You have not favorited any movies!</h3>
  } else if (props.location.pathname === '/watchlist' && !props.movies.length) {
    message = <h3 className="display-msg">You have not started a watchlist!</h3>
  }

  return (
    <div className="MovieContainer">
      <h2 className="movie-container-header">{header}</h2>
      <section className="flex-container">
        {message}
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

MovieContainer.propTypes = {
  deleteUserFavorite: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  movies: PropTypes.array,
  updateUserFavorites: PropTypes.func,
  user: PropTypes.object
};
