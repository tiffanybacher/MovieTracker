import React from 'react';

const MovieCard = ({ title, overview, posterImg, id, rating, releaseDate }) => {

  return (
    <article className="MovieCard">
      <h2>{title}</h2>
      <img src={posterImg} alt={`${title} poster`}/>
    </article>
  );
} 

export default MovieCard;