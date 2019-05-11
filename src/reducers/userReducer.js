export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {id: action.id, name: action.name, favorites: action.favorites};
    case 'LOGOUT_USER':
      return {};
    case 'UDATE_USER_FAVORITES':
      return {
        id: state.id,
        name: state.name,
        favorites: [...state.favorites, action.movieId]
      };
    default: 
      return state;
  }
};