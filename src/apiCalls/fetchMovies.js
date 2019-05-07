import { jacobKey, baseUrl } from '../utils/API-logins'

export const fetchMovies = () => {
  fetch(`${baseUrl}discover/movie${jacobKey}`)
    .then(response => response.json())
    .then(result => console.log(result));
}

