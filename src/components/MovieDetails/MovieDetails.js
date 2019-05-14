import React from 'react';
import { CastContainer } from '../CastContainer/CastContainer';

export const MovieDetails = (props) => {
  const { title, overview, posterImg, id, rating, releaseDate, backdropImg } = props.movieDetails;
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

  const backgroundImg = {
    backgroundImage: `url(${backdropImg})`
  }

  let directorInfo;
  let writerInfo;

  if (director) {
    directorInfo = director.map(person => {
      return (
        <div className="crew-member" key={person.id}>
          <h4>{person.job}</h4>
          <p>{person.name}</p>
        </div>
      );
    });
  }

  if (writer) {
    writerInfo = writer.map(person => {
      return (
        <div className="crew-member" key={person.id}>
          <h4>{person.job}</h4>
          <p>{person.name}</p>
        </div>
      );
    });
  }

  let heartClass = 'far';

  return (
    <div className="MovieDetails-container">
      <div className="MovieDetails-backdrop" style={backgroundImg}>
        <div className="backdrop-cover">
        <article className="MovieDetails">
          <img className="card-img" src={posterImg} alt={`${title} poster`} />
          <div className="card-info">
            <div className="card-header">
              <div className="card-title-wrap">
                <h2 className="card-title">{title}</h2>
                <p className="card-year">({releaseYear})</p>
              </div>
              <div className="card-btns">
                <div className="circle-wrapper">{ratingCircle}</div>
                <div className="btn-wrapper heart-wrapper"><i className={`${heartClass} fa-heart`} /></div>
                <div className="btn-wrapper bookmark-wrapper"><i className="far fa-bookmark"></i></div>
              </div>
            </div>
            <p className="card-overview">{overview}</p>
            <div className="crew-info">
              {directorInfo}
              {writerInfo}
            </div>
          </div>
        </article>
        </div>
      </div>
      <CastContainer cast={cast}/>
    </div>
  );
}