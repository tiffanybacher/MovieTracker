import React from 'react';
import { CastContainer } from '../CastContainer/CastContainer';

export const MovieDetails = (props) => {
  const { title, overview, posterImg, id, rating, releaseDate } = props.movieDetails;
  const { director, writer, cast } = props.people;
  let releaseYear = releaseDate.substring(0, 4);
  let percentage = rating * 10;
  let ratingNum;

  if (rating.toString().length === 1) {
    ratingNum = `${rating}.0`;
  } else {
    ratingNum = rating;
  };

  let ratingCircle = 
    <svg viewBox="0 0 36 36" className="rating-circle">
      <path className="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"/>
      <path className="circle"
        strokeDasharray={`${percentage}, 100`}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"/>
      <text x="9" y="23" className="rating-num">{ratingNum}</text>
    </svg>

  return (
    <div>
      <article className="MovieDetails">
        <img className="card-img" src={posterImg} alt={`${title} poster`} />
        <div className="card-info">
          <div className="card-header">
            <div className="circle-wrapper">{ratingCircle}</div>
            <div className="card-title-wrap">
              <h2 className="card-title">{title}</h2>
              <p className="card-year">({releaseYear})</p>
            </div>
          </div>
          <p className="card-overview">{overview}</p>
        </div>
      </article>
      <CastContainer cast={cast}/>
    </div>
  );
}