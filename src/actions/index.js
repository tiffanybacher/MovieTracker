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

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
});
