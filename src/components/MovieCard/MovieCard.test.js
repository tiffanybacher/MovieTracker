import { MovieCard } from "./MovieCard";
import { shallow } from "enzyme";
import React from "react";
import { cleanMovie, mockUser } from "../../api/__tests__/mockData";
import { fetchAddFavorite } from "../../api/fetchAddFavorite";

jest.mock("../../api/fetchAddFavorite");

const mockUpdateUserFavorites = jest.fn();
const mockDeleteUserFavorite = jest.fn();
const defaultState = {
  favorites: null,
  isFavorite: false,
  error: ""
};
const userlessComponent = (
  <MovieCard
    {...cleanMovie}
    user={{}}
    updateUserFavorites={mockUpdateUserFavorites}
    deleteUserFavorite={mockDeleteUserFavorite}
    key={111}
  />
);
const userComponent = (
  <MovieCard
    {...cleanMovie}
    user={mockUser}
    updateUserFavorites={mockUpdateUserFavorites}
    deleteUserFavorite={mockDeleteUserFavorite}
    key={111}
  />
);

describe("MovieCard", () => {
  it("should match the snapshot", () => {
    let wrapper = shallow(userComponent);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    let wrapper = shallow(userlessComponent, { disableLifecycleMethods: true });
    expect(wrapper.state()).toEqual(defaultState);
  });

  describe('handleFavorite', () => {
    it('should invoke fetchAddFavorite if isFavorite is false and the user is logged in', () => {
      let wrapper = shallow(userComponent);
      fetchAddFavorite.mockImplementation(() => Promise.resolve())
      wrapper.instance().handleFavorite();
      expect(fetchAddFavorite).toHaveBeenCalled();
    });

    it('should invoke updateUserFavorites after fetchAddFavorite', () => {
      let wrapper = shallow(userComponent);
      fetchAddFavorite.mockImplementation(() => Promise.resolve());
      wrapper.instance().handleFavorite();
      expect(mockUpdateUserFavorites).toHaveBeenCalled();
    });

    it.skip('should set state to an error if the fetch fails', () => {
      let wrapper = shallow(userComponent);
      fetchAddFavorite.mockImplementation(() => {throw new Error('error')});
      wrapper.instance().handleFavorite();
      expect(wrapper.state('error')).toEqual('error')
    });

    it('should invoke deleteUserFavorite if the movie is already favorited', () => {
      let wrapper = shallow(userComponent);
      fetchAddFavorite.mockImplementation(() => Promise.resolve());
      wrapper.instance().handleFavorite();
      expect(mockUpdateUserFavorites).toHaveBeenCalled();
    });

    it.skip('should prompt the user to login if they favoroite without being logged in', () => {
      let wrapper = shallow(userlessComponent);
      // expect something to have been called
    });
  });
});
