export const addDiscoverMovies = (movies) => ({
  type: 'ADD_DISCOVER_MOVIES',
  movies
});

export const updateUser = (id, name, favorites) => ({
  type: 'UPDATE_USER',
  id, 
  name,
  favorites
});

export const updateUserFavorites = (movieId) => ({
  type: 'UDATE_USER_FAVORITES',
  movieId
});

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
});
