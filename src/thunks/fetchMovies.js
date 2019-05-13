import { jacobKey } from '../utils/API-logins';
import { baseUrl } from '../api/pathNames.js';
import { addDiscoverMovies } from '../actions';
import { cleanAllMovies } from '../api/cleaners';

export const fetchMovies = (fetchCase, query) => {
  let url;
  
  switch(fetchCase) {
    case 'search':
      url = `${baseUrl}search/movie${jacobKey}&language=en-US&query=${query}&page=1&include_adult=false`
      break;
    case 'discover':
      url = `${baseUrl}discover/movie${jacobKey}`
      break;
    default:
      console.log('Need fetchCase');
  } 

  return async (dispatch) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Search failed");
      }
      const data = await response.json();
      const movies = cleanAllMovies(data.results);

      dispatch(addDiscoverMovies(movies));
    } catch(error) {
      console.log(error);
    }
  }
}