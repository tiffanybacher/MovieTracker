import { jacobKey } from '../utils/API-logins';
import { baseUrl } from '../api/pathNames.js';
import { addDiscoverMovies } from '../actions';
import { cleanAllMovies } from '../api/cleaners';

export const fetchSearch =  (query) => {
  const url = `${baseUrl}search/movie${jacobKey}&language=en-US&query=${query}&page=1&include_adult=false`
  return async (dispatch) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Search failed");
      }
      const data = await response.json();
      const movies = cleanAllMovies(data.results)
      dispatch(addDiscoverMovies(movies));
    } catch(error) {
      console.log(error);
    }
  }
}