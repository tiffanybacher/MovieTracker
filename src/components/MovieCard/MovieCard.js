import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        isFavorite: favorites.includes(props.id)
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
      console.log("NOT LOGGED IN")
    }
  }

  render() {
    const { title, overview, posterImg, id, rating, releaseDate } = this.props;
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
            <div className="circle-wrapper">{ratingCircle}</div>
            <div className="card-title-wrap">
              <h2 className="card-title">{title}</h2>
              <p className="card-year">({releaseYear})</p>
            </div>
            <i className={`${heartClass} fa-heart`} onClick={this.handleFavorite} />
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