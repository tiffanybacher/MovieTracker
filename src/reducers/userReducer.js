export const userReducer = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_USER':
      return {id: action.id, name: action.name};
    case 'LOGOUT_USER':
      return {};
    default:
      return state;
  }
}