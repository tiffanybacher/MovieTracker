import { imageUrl } from '../utils/API-logins';

export const cleanDiscover = (moviesArray) => {
  const cleanMovies = moviesArray.map(movie => {
    const { id, title, poster_path, overview, release_date, vote_average } = movie;

    return { id, title, posterImg: `${imageUrl}${poster_path}`, overview, releaseDate: release_date, rating: vote_average };
  });

  return cleanMovies;
}