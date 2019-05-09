export const addDiscoverMovies = (movies) => ({
  type: 'ADD_DISCOVER_MOVIES',
  movies
});

export const updateUser = (id, name) => ({
  type: 'UPDATE_USER',
  id, 
  name
});

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
});