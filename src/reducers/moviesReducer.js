export const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_DISCOVER_MOVIES':
      return action.movies;
    case 'ADD_FAVORITE_MOVIES':
      return action.favorites;
    case 'ADD_WATCHLIST_MOVIES':
      return action.watchlist;
    default:
      return state;
  }
};