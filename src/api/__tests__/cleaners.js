import { cleanAllMovies, cleanPeople } from '../cleaners';
import * as MD from '../mockData';

describe('cleanAllMovies', () => {
  it('should return an array of clean movies', () => {
    const result = cleanAllMovies([
      MD.mockUncleanMovie,
      MD.mockUncleanMovie
    ]);

    expect(result).toEqual([MD.cleanMovie, MD.cleanMovie]);
  });

  it('should return an object of clean people', () => {
    const result = cleanPeople(MD.uncleanPeople);
    
    expect(result).toEqual(MD.cleanPeople);
  });
});