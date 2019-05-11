import { jacobKey } from '../utils/API-logins';
import { baseUrl } from './pathNames';

const fetchMoviePeople = (id) => {
  return fetch(`${baseUrl}movie/${id}/credits${jacobKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('People failed to fetch');
      } else {
        return response.json();
      }
    });
};

export default fetchMoviePeople;
