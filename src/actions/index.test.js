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
    const favorites = [11111, 22222, 33333];
    const expected = {
      type: 'UPDATE_USER',
      id,
      name,
      favorites
    };
    const result = actions.updateUser(id, name, favorites);

    expect(result).toEqual(expected);
  });

  it('should return a LOGOUT_USER action', () => {
    const expected = {
      type: 'LOGOUT_USER'
    };
    const result = actions.logoutUser();

    expect(result).toEqual(expected);
  });

  it("should return a UPDATE_USER_FAVORITES action", () => {
    const movieId = 11111;
    const expected = {
      type: "UPDATE_USER_FAVORITES",
      movieId
    };
    const result = actions.updateUserFavorites(movieId);

    expect(result).toEqual(expected);
  });

  it("should return a DELETE_USER_FAVORITE action", () => {
    const movieId = 11111;
    const expected = {
      type: "DELETE_USER_FAVORITE",
      movieId
    };
    const result = actions.deleteUserFavorite(movieId);

    expect(result).toEqual(expected);
  });
});