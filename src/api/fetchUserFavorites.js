import { serverUrl } from "./pathNames";

export const fetchUserFavorites = (id) => {
  const url = `${serverUrl}/${id}/favorites`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error('Failed to fetch user favorites');
      } else  {
        return response.json();
      }
    })
    .then(result => result.data);
};