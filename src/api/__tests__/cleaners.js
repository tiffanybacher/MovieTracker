import { cleanAllMovies } from '../cleaners';
import * as MD from '../__mocks__/mockData';

describe('cleanAllMovies', () => {
  it('should return an array of clean movies', () => {
    const result = cleanAllMovies([
      MD.mockUncleanMovie,
      MD.mockUncleanMovie
    ]);
    expect(result).toEqual([MD.cleanMovie, MD.cleanMovie]);
  })
})