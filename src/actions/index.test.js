import * as actions from './index';


describe('Action Creators', () => {
  it('should return an ADD_DISCOVER_MOVIES action', () => {
    const movies = [{ title: 'The Parent Trap'}];
    const expected = {
      type: 'ADD_DISCOVER_MOVIES',
      movies
    };
    const result = actions.addDiscoverMovies(movies);

    expect(result).toEqual(expected);
  });

  it('should return a UPDATE_USER action', () => {
    const id = 1;
    const name = 'Jacob';
    const expected = {
      type: 'UPDATE_USER',
      id,
      name
    };
    const result = actions.updateUser(id, name);

    expect(result).toEqual(expected);
  });

  it('should return a LOGOUT_USER action', () => {
    const expected = {
      type: 'LOGOUT_USER'
    };
    const result = actions.logoutUser();

    expect(result).toEqual(expected);
  });
});