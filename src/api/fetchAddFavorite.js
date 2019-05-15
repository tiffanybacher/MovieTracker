import { serverUrl } from "./pathNames";

export const fetchAddFavorite = (cardData) => {
  const url = `${serverUrl}/favorites/new`;
  const { 
    user, 
    title, 
    overview, 
    posterImg, 
    id, 
    rating, 
    releaseDate 
  } = cardData;
  let poster_path = posterImg.split('500')[1];
  const body = {
    movie_id: id, 
    user_id: user.id,
    title, 
    poster_path,
    release_date: releaseDate, 
    vote_average: rating, 
    overview
  };
  const init = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch(url, init)
    .then(response => {
      if (!response.ok) {
        throw Error('Failed to add favorite');
      } else {
        return response.json();
      }
    });
};
