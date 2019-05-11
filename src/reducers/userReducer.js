export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        id: action.id,
        name: action.name,
        favorites: action.favorites
      };
    case "LOGOUT_USER":
      return {};
    case "UPDATE_USER_FAVORITES":
      return {
        id: state.id,
        name: state.name,
        favorites: [...state.favorites, action.movieId]
      };
    case "DELETE_USER_FAVORITE":
      return {
        id: state.id,
        name: state.name,
        favorites: state.favorites.filter(favorite => favorite !== action.movieId)
      };
    default:
      return state;
  }
};