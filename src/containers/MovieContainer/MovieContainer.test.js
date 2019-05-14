import React from 'react';
import { shallow } from 'enzyme';
import { cleanMovie, mockUser } from '../../api/__tests__/mockData'
import { MovieContainer, mapStateToProps, mapDispatchToProps } from './MovieContainer';
import { updateUserFavorites, deleteUserFavorite } from '../../actions';
import { fetchDeleteFavorite } from '../../thunks/fetchDeleteFavorite';

const mockMovies = [cleanMovie, cleanMovie];
jest.mock("../../thunks/fetchDeleteFavorite");

describe('MovieContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MovieContainer movies={mockMovies} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("mapStateToProps", () => {
    it("should return an object with a movies and todos array", () => {
      const state = { user: mockUser, movies: mockMovies, test: 'test' };
      const expected = { user: state.user, movies: state.movies };
      const result = mapStateToProps(state);
      expect(result).toEqual(expected);
    });
  });

  describe("mapDispatchToProps", () => {
    it("should call dispatch when updateUserFavorites is called", () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = updateUserFavorites(11111);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.updateUserFavorites(11111);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it("should call dispatch when deleteUserFavorite is called", () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = fetchDeleteFavorite(1, 11111);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.deleteUserFavorite(1, 11111);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});