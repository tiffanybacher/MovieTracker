import { moviesReducer } from '../moviesReducer';
import * as actions from '../../actions';

const movies = [{ title: 'The Parent Trap'}];

describe('moviesReducer', () => {
  it('should return state on default', () => {
    const expected = [];
    const result = moviesReducer(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should return state with an array of discover movies', () => {
    const expected = movies;
    const result = moviesReducer(undefined, actions.addDiscoverMovies(movies));
    
    expect(result).toEqual(expected);
  });
});