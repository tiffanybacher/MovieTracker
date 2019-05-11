import { imageUrl } from '../utils/API-logins';

export const cleanAllMovies = (moviesArray) => {
  const cleanMovies = moviesArray.map(movie => {
    const { 
      id, 
      title, 
      poster_path, 
      overview, 
      release_date, 
      vote_average 
    } = movie;

    return { 
      id, 
      title, 
      posterImg: `${imageUrl}${poster_path}`, 
      overview, 
      releaseDate: release_date, 
      rating: vote_average 
    };
  });

  return cleanMovies;
};

export const cleanPeople = (data) => {
  const director = data.crew.filter(person => person.job === "Director");
  const writer = data.crew.filter(person => person.job === "Writer");
  const cast = data.cast.map(person => {
    let { name, character, profile_path,  cast_id} = person;

    return { 
      name, 
      character, 
      headshot: `${imageUrl}${profile_path}`, 
      id: cast_id 
    };
  });

  return { director, writer, cast };
};