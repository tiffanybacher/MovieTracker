import { jacobKey } from '../utils/API-logins';
import { baseUrl } from './pathNames';

const fetchDiscover = () => {
  return fetch(`${baseUrl}discover/movie${jacobKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Discover failed to fetch');
      } else {
        return response.json();
      }
    });
};

export default fetchDiscover;

