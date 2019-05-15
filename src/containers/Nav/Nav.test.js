import React from 'react';
import { shallow } from 'enzyme';
import { Nav, mapStateToProps, mapDispatchToProps } from './Nav';
import { mockUser, mockCleanMovie, mockUncleanMovie } from '../../api/mockData';
import { fetchUserFavorites } from '../../api/fetchUserFavorites';
import { cleanAllMovies } from '../../api/cleaners';
import { logoutUser, addFavoriteMovies, addWatchlistMovies } from '../../actions';
import { fetchMovies } from '../../thunks/fetchMovies';


jest.mock('../../api/fetchUserFavorites');
jest.mock('../../api/cleaners');
jest.mock('../../thunks/fetchMovies');

fetchUserFavorites.mockImplementation(() => Promise.resolve([mockUncleanMovie]));
cleanAllMovies.mockImplementation(() => Promise.resolve([mockCleanMovie]));

const mockLogoutUser = jest.fn();
const mockResetMovies = jest.fn();
const mockDisplayFavorites = jest.fn();
const mockDisplayWatchlist = jest.fn();

describe('Nav', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(
      <Nav 
        user={mockUser}
        logoutUser={mockLogoutUser}
        resetMovies={mockResetMovies}
        displayFavorites={mockDisplayFavorites}
        displayWatchlist={mockDisplayWatchlist}
      />
    );
    instance = wrapper.instance();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a detailed state', () => {
    const defaultState = { showLogin: false };
    expect(wrapper.state()).toEqual(defaultState);
  });

  describe('Event Listeners', () => {
    it("should invoke toggleLogin when login is clicked", () => {
      let wrapper = shallow(
        <Nav 
          user={{}}
          logoutUser={mockLogoutUser}
          resetMovies={mockResetMovies}
          displayFavorites={mockDisplayFavorites}
          displayWatchlist={mockDisplayWatchlist}
        />);
      wrapper.find('.login-link').simulate("click");
      expect(wrapper.state('showLogin')).toEqual(true);
    });

    it("should invoke toggleLogin when login is clicked", () => {
      let wrapper = shallow(
        <Nav
          user={{}}
          logoutUser={mockLogoutUser}
          resetMovies={mockResetMovies}
          displayFavorites={mockDisplayFavorites}
          displayWatchlist={mockDisplayWatchlist}
        />
      );
      wrapper.instance().setState({ showLogin: true });
      wrapper.find(".signup-link").simulate("click");
      expect(wrapper.state("showLogin")).toEqual(false);
    });

    it('should invoke handleLogout when logout is clicked', () => {
      wrapper.find('.logout-link').simulate('click');
      expect(mockLogoutUser).toHaveBeenCalled();
    });

    it("should invoke goToFavorites when Favorites is clicked", () => {
      wrapper.find('.favorite-link').simulate("click");
      expect(fetchUserFavorites).toHaveBeenCalled();
    });

    it("should invoke goToWatchlist when Watchlist is clicked", () => {
      wrapper.find(".watchlist-link").simulate("click");
      expect(mockDisplayWatchlist).toHaveBeenCalled();
    });

    it("should invoke resetMovies when logo is clicked", () => {
      wrapper.find(".main-heading").simulate("click");
      expect(mockResetMovies).toHaveBeenCalled();
    });

    it("should invoke resetMovies when Explore link is clicked", () => {
      wrapper.find(".explore-link").simulate("click");
      expect(mockResetMovies).toHaveBeenCalled();
    });
  });

  describe('toggleLogin', () => {
    it('should toggle the showLogin boolean', () => {
      expect(wrapper.state('showLogin')).toEqual(false);
      instance.toggleLogin();
      expect(wrapper.state("showLogin")).toEqual(true);
      instance.toggleLogin();
      expect(wrapper.state('showLogin')).toEqual(false);
    });
  });

  describe('hideLogin', () => {
    it("should set the showLogin to false", () => {
      expect(wrapper.state("showLogin")).toEqual(false);
      instance.toggleLogin();
      expect(wrapper.state("showLogin")).toEqual(true);
      instance.hideLogin();
      expect(wrapper.state("showLogin")).toEqual(false);
    });
  });

  describe("handleLogout", () => {
    it("should invoke the logoutUser dispath", () => {
      instance.handleLogout();
      expect(mockLogoutUser).toHaveBeenCalled();
    });
  });

  describe('goToFavorites', () => {
    it('should call displayFavorites with an empty array if the user has no favorites', () => {
      let noFavesUser = {
        name: 'Jacob',
        id: 1,
        favorites: []
      };
      let wrapper = shallow(
        <Nav
          user={noFavesUser}
          logoutUser={mockLogoutUser}
          resetMovies={mockResetMovies}
          displayFavorites={mockDisplayFavorites}
          displayWatchlist={mockDisplayWatchlist}
        />
      );

      wrapper.instance().goToFavorites();
      expect(mockDisplayFavorites).toHaveBeenCalledWith([]);
    });

    it('should invoke fetchUserFavorites if the user has favorited movies', () => {
      instance.goToFavorites();
      expect(fetchUserFavorites).toHaveBeenCalled();
    });

    it('should invoke cleanAllMovies after fetchUserFavorites has resolved', async () => {
      await instance.goToFavorites();
      expect(cleanAllMovies).toHaveBeenCalledWith([mockUncleanMovie]);
    });

    it('should invoke cleanAllMovies after fetchUserFavorites has resolved', async () => {
      await instance.goToFavorites();
      expect(mockDisplayFavorites).toHaveBeenCalledWith([mockCleanMovie]);
    });
  });

  describe('mapStateToProps', () => {
    it('should return an user object', () => {
      const state = { user: mockUser, test: 'test'};
      const expected = { user: state.user };
      const result = mapStateToProps(state);
      expect(result).toEqual(expected);
    });
  });

  describe("mapDispatchToProps", () => {
    it("should call dispatch when using logoutUser", () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = logoutUser();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.logoutUser();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it("should call dispatch when using resetMovies", () => {
      const mockDispatch = jest.fn();
      const thunkToDispatch = fetchMovies('discover');
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.resetMovies('discover');
      expect(mockDispatch).toHaveBeenCalledWith(thunkToDispatch);
    });
  });

  it("should call dispatch when using displayWatchlight", () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = addWatchlistMovies(mockUser.favorites);
    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.displayWatchlist(mockUser.favorites);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
});