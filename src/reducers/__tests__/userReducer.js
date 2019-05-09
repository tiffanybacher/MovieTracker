import { userReducer } from '../userReducer';
import * as actions from '../../actions';
    
const user = { id: 1, name: "Jacob" };

describe('userReducer', () => {
  it('should return state on defualt', () => {
    const expected = {};
    const result = userReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should set state to user on UPDATE_USER', () => {
    const { id, name } = user;
    const result = userReducer(undefined, actions.updateUser(id, name));
    expect(result).toEqual(user);
  });

  it('should clear state on LOGOUT_USER', () => {
    const expected = {};
    const result = userReducer(user, actions.logoutUser());
    expect(result).toEqual(expected);
  });
});