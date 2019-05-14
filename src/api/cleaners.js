import { imageUrl } from './pathNames';

export const cleanAllMovies = (moviesArray) => {
  const cleanMovies = moviesArray.map(movie => {
    let id;
    let backdropImg;

    if (movie.movie_id) {
      id = movie.movie_id;
    } else {
      id = movie.id
    }

    if (movie.backdrop_path) {
      backdropImg = `${imageUrl}${movie.backdrop_path}`
    } else {
      backdropImg = '';
    }

    const { 
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
      rating: vote_average,
      backdropImg
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