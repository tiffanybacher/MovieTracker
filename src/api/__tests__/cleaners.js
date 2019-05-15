import { cleanAllMovies, cleanPeople } from '../cleaners';
import * as MD from '../mockData';

describe('cleanAllMovies', () => {
  let cleanMovie = {
    ...MD.mockCleanMovie,
    backdropImg:
      "https://image.tmdb.org/t/p/w500/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg"
  };
  it('should return an array of clean movies', () => {
    const result = cleanAllMovies([
      MD.mockUncleanMovie,
      MD.mockUncleanMovie
    ]);

    expect(result).toEqual([cleanMovie, cleanMovie]);
  });

  it('should return an object of clean people', () => {
    const result = cleanPeople(MD.uncleanPeople);
    
    expect(result).toEqual(MD.mockCleanPeople);
  });
});