import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { CastContainer } from '../CastContainer/CastContainer';
import { fetchAddFavorite } from '../../api/fetchAddFavorite';

class MovieDetails extends Component {
  state = {
    error: ''
  }

  handleFavorite = () => {
    const { user, movieDetails } = this.props;

    if (user.id && !user.favorites.includes(movieDetails.id)) {
      fetchAddFavorite({ ...movieDetails,  user })
        .catch(error => this.setState({ error }));
      this.props.updateUserFavorites(movieDetails.id);
    } else if (user.id && user.favorites.includes(movieDetails.id)){
      this.props.deleteUserFavorite(user.id, movieDetails.id);
    } else {
      alert('You must be logged in to favorite a movie')
    }
  }

  render() {
    const { props } = this;
    const { title, overview, posterImg, id, rating, releaseDate, backdropImg } = props.movieDetails;
    const { director, writer, cast } = props.people;
    const backgroundImg = {
      backgroundImage: `url(${backdropImg})`
    }
    let releaseYear = releaseDate.substring(0, 4);
    let percentage = rating * 10;
    let ratingNum;
    let directorInfo;
    let writerInfo;
    let heartClass = 'far';

    if (props.user.id && props.user.favorites.includes(id)) {
      heartClass = 'fas';
    }

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

    if (director) {
      directorInfo = director.map(person => {
        return (
          <div className="crew-member">
            <h4>{person.job}</h4>
            <p>{person.name}</p>
          </div>
        );
      });
    }

    if (writer) {
      writerInfo = writer.map(person => {
        return (
          <div className="crew-member">
            <h4>{person.job}</h4>
            <p>{person.name}</p>
          </div>
        );
      });
    }

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
                    <div 
                      className="btn-wrapper heart-wrapper"
                      onClick={this.handleFavorite}>
                      <i className={`${heartClass} fa-heart`} />
                    </div>
                    <div className="btn-wrapper bookmark-wrapper"><i class="far fa-bookmark"></i></div>
                  </div>
                </div>
                <p className="card-overview">{overview}</p>
                <div className="crew-info">
                  {directorInfo}
                  {writerInfo}
                </div>
              </div>
              <p className="card-overview">{overview}</p>
              <div className="crew-info">
                {directorInfo}
                {writerInfo}
              <div className="card-btns">
                <div className="circle-wrapper">{ratingCircle}</div>
                <div className="btn-wrapper heart-wrapper"><i className={`${heartClass} fa-heart`} /></div>
                <div className="btn-wrapper bookmark-wrapper"><i className="far fa-bookmark"></i></div>

              </div>
            </div>
          </article>
          </div>
        </div>
        <CastContainer cast={cast}/>
      </div>
    );
  }
}

export default MovieDetails;

MovieDetails.propTypes = {
  ovieDetails: PropTypes.object,
  people: PropTypes.object
};
