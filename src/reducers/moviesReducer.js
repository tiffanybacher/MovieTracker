export const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_DISCOVER_MOVIES':
      return action.movies;
      break;
    case 'ADD_FAVORITE_MOVIES':
      return action.favorites;
      break;
    default:
      return state;
  }
};