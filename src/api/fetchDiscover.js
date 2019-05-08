import { jacobKey, baseUrl } from '../utils/API-logins'

const fetchDiscover = () => {
  return fetch(`${baseUrl}discover/movie${jacobKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Discover failed to fetch');
      } else {
        return response.json();
      }
  });
}

export default fetchDiscover;

