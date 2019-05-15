import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { fetchAddFavorite } from '../../api/fetchAddFavorite';

export class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: null,
      isFavorite: false,
      error: ''
    }
  }
  
  static getDerivedStateFromProps(props, state) {
    let { favorites } = props.user;

    if (props.user.id && state.favorites !== favorites) {
      return {
        favorites: favorites,
        isFavorite: favorites 
          ? favorites.includes(props.id)
          : false
      };
    }

    return null;
  }

  handleFavorite = () => {
    let { isFavorite} = this.state

    if (!isFavorite && this.props.user.id) {
      fetchAddFavorite(this.props)
        .catch(error => this.setState({ error }));
      this.props.updateUserFavorites(this.props.id);
    } else if (isFavorite && this.props.user.id){
      this.props.deleteUserFavorite(this.props.user.id, this.props.id);
    } else {
      this.props.history.push('/login');
    }
  }

  render() {
    const { title, overview, posterImg, id, rating, releaseDate, user } = this.props;
    let heartClass = this.state.isFavorite 
      ? 'fas'
      : 'far';
    let movieOverview;
    let ratingNum;
    let circleClass;
    let percentage = rating * 10;
    let releaseYear = releaseDate.substring(0, 4);
  
    if (overview.length > 150) {
      let shortOverview = overview
        .split(" ")
        .slice(0, 35)
        .join(" ");

      movieOverview = `${shortOverview}...`;
    } else {
      movieOverview = overview;
    }

    if (rating.toString().length === 1) {
      ratingNum = `${rating}.0`;
    } else {
      ratingNum = rating;
    }

    if (percentage > 70) {
      circleClass = "circle-green";
    } else if (percentage > 30) {
      circleClass = "circle-yellow";
    } else if (percentage > 0) {
      circleClass = "circle-red";
    }

    let ratingCircle = (
      <svg viewBox="0 0 36 36" className="rating-circle">
        <path
          className="circle-bg"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className={`circle ${circleClass}`}
          strokeDasharray={`${percentage}, 100`}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="9" y="23" className="rating-num">
          {ratingNum}
        </text>
      </svg>
    );

    return (
      <article className="MovieCard">
        <img className="card-img" src={posterImg} alt={`${title} poster`} />
        <div className="card-info">
          <div className="card-header">
            <div className="card-header-left">
              <div className="circle-wrapper">{ratingCircle}</div>
              <div className="card-title-wrap">
                <h2 className="card-title">{title}</h2>
                <p className="card-year">({releaseYear})</p>
              </div>
            </div>
            <div className="icon-wrap">
              <i className={`${heartClass} fa-heart`} onClick={this.handleFavorite} />
              <i className="far fa-bookmark" />
            </div>
          </div>
          <p className="card-overview">{movieOverview}</p>
          <Link className="more-info-btn" role="button" to={`/movie/${id}`}>
            More Info
          </Link>
        </div>
      </article>
    );
  }
} 

export default MovieCard;

MovieCard.propTypes = {
  backdropImg: PropTypes.string,
  deleteUserFavorite: PropTypes.func,
  id: PropTypes.number,
  overview: PropTypes.string,
  posterImg: PropTypes.string,
  rating: PropTypes.number,
  releaseDate: PropTypes.string,
  title: PropTypes.string,
  updateUserFavorites: PropTypes.func,
  user: PropTypes.object
};