import { serverUrl } from './pathNames';

export const fetchAllUsers = () => {
  return fetch(serverUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch all users');
      } else {
        return response.json();
      }
    })
    .then(data => data.data);
};
