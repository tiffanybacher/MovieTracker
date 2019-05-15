import { jacobKey } from '../utils/API-logins';
import { baseUrl } from './pathNames';

const fetchMoviePeople = (id) => {
  return fetch(`${baseUrl}movie/${id}/credits${jacobKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch movie cast and crew');
      } else {
        return response.json();
      }
    });
};

export default fetchMoviePeople;
