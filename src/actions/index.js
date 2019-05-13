export const addDiscoverMovies = (movies) => ({
  type: 'ADD_DISCOVER_MOVIES',
  movies
});

export const addFavoriteMovies = (favorites) => ({
  type: 'ADD_FAVORITE_MOVIES',
  favorites
})

export const updateUser = (id, name, favorites) => ({
  type: 'UPDATE_USER',
  id, 
  name,
  favorites
});

export const updateUserFavorites = (movieId) => ({
  type: 'UPDATE_USER_FAVORITES',
  movieId
});

export const deleteUserFavorite = (movieId) => ({
  type: 'DELETE_USER_FAVORITE',
  movieId
}); 

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
});
