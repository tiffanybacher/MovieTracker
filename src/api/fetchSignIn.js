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
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to sign in');
      } else {
        return response.json();
      }
    })
    .then(data => data.data);
}