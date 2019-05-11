import { serverUrl } from './pathNames';

export const fetchNewUser = (email, name, password) => {
  const body = JSON.stringify({ email, name, password });
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  };
  const request = new Request(`${serverUrl}/new`, init);

  return fetch(request)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create account');
      } else {
        return response.json();
      }
    })
    .then(data => {
      return data.id;
    });
};