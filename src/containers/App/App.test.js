import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { cleanAllMovies } from '../../api/cleaners';
import { mockUncleanMovie, cleanMovie } from '../../api/mockData';
import { fetchMovies } from '../../thunks/fetchMovies';

jest.mock('../../thunks/fetchMovies');
jest.mock('../../api/cleaners.js');

describe('App', () => {
  let wrapper, instance;
  let mockSetMovies = jest.fn();
  
  beforeEach(() => {
    wrapper = shallow(<App setMovies={mockSetMovies}/>);
    instance = wrapper.instance();
  });

  afterEach(() => {
    mockSetMovies.mockClear();
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a defult state', () => {
    wrapper = shallow(<App />, { disableLifecycleMethods: true });
    expect(wrapper.state()).toEqual({ error: ''});
  });

  it('CDM should call setMovies method', () => {
    expect(mockSetMovies).toHaveBeenCalled();
  });

  describe('mapStateToProps', () => {
    it('should return an array of movies', () => {
      const state = { user: { name: 'Jacob'}, movies: [cleanMovie, cleanMovie]};
      const expected = { movies: state.movies};
      const result = mapStateToProps(state);
      expect(result).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch when using setMovies', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = fetchMovies('discover');
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setMovies('discover');
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});
