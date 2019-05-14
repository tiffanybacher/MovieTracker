import React from 'react';
import { shallow } from 'enzyme';
import { MovieDetailsContainer, mapStateToProps } from './MovieDetailsContainer';
import { cleanMovie, uncleanPeople, mockCleanPeople } from '../../api/__tests__/mockData';
import fetchMoviePeople from '../../api/fetchMoviePeople';
import { cleanPeople } from '../../api/cleaners';

const mockLocation = { pathname: '/localhost3001/11111'};
const mockMovies = [cleanMovie, cleanMovie]
jest.mock('../../api/fetchMoviePeople');
jest.mock("../../api/cleaners");

fetchMoviePeople.mockImplementation(() => Promise.resolve(uncleanPeople));
cleanPeople.mockImplementation(() => mockCleanPeople)

describe('MovieDetailsContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MovieDetailsContainer location={mockLocation} movies={mockMovies} />)
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    const defaultState = {
      people: {},
      movieId: '11111'
    };
    wrapper = shallow(
      <MovieDetailsContainer
        location={mockLocation}
        movies={mockMovies}
      />,
      { disableLifecycleMethods: true });

    expect(wrapper.state()).toEqual(defaultState)
  });

  describe('componentDidMount', () => {
    it('should invoke fetchMoviePeople on mount', () => {
      expect(fetchMoviePeople).toHaveBeenCalledWith('11111');
    });

    it('should invoke cleanPeople', () => {
      expect(cleanPeople).toHaveBeenCalledWith(uncleanPeople);
    });

    it('should set state to cleaned people', () => {
      expect(wrapper.state('people')).toEqual(mockCleanPeople);
    });
  });

  describe('MSTP', () => {
    it('should return an object with a movies array', () => {
      const state = { movies: mockMovies, user: { name: 'Jacob' }}
      const expected = { movies: mockMovies };
      const result = mapStateToProps(state);
      expect(result).toEqual(expected);
    });
  });
});