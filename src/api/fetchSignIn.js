import { serverUrl } from './pathNames';

export const fetchSignIn = (email, password) => {
  const body = JSON.stringify({ email, password });
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body 
  }
  const request = new Request(serverUrl, init);

  return fetch(request)
    .then(response => response.json())
    .then(data => data.data);
}