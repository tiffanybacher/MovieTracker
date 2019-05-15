import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import LoginForm from '../../containers/LoginForm/LoginForm';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser, addFavoriteMovies, addWatchlistMovies } from '../../actions';
import { fetchMovies } from '../../thunks/fetchMovies';
import { fetchUserFavorites } from '../../api/fetchUserFavorites';
import { cleanAllMovies } from '../../api/cleaners';

export class Nav extends Component {
  constructor() {
    super();

    this.state = {
      showLogin: false,
    }
  }

  toggleLogin = () => {
    this.setState({ showLogin: !this.state.showLogin });
  }

  hideLogin = () => {
    this.setState({ showLogin: false });
  }

  handleLogout = () => {
    this.props.logoutUser();
  }

  goToFavorites = () => {
    if (!this.props.user.favorites.length) {
      this.props.displayFavorites([]);
    } else {
      fetchUserFavorites(this.props.user.id)
        .then(result => cleanAllMovies(result))
        .then(movies => this.props.displayFavorites(movies));
    }
  }

  goToWatchlist = () => {
    if (!this.props.user.watchlist) {
      this.props.displayWatchlist([]);
    } else {
      console.log('Create fetchUserWatchlist')
    }
  }

  render() {
    const { name } = this.props.user;
    let accountNav;
    let loginActive;
    let favoriteLink;
    let watchLink;

    if (this.state.showLogin) {
      loginActive = 'active';
    }

    if (!this.props.user.name) {
      accountNav = (
        <div className="nav-right">
          <a
            href="#"
            className={`login-link nav-link ${loginActive}`}
            onClick={this.toggleLogin}
          >
            LOGIN
          </a>
          <NavLink
            to="/signup"
            className="signup-nav-link nav-link"
            onClick={this.hideLogin}
          >
            SIGN UP
          </NavLink>
        </div>
      );

      favoriteLink =
        <Link to="/login" className="nav-link">
          FAVORITES
        </Link>

      watchLink = 
        <Link to="/login" className="nav-link">
          WATCHLIST
        </Link>
    } else {
      accountNav =
        <div className="greeting-wrapper">
          <p className="user-greeting">HI, {name.toUpperCase()}!</p>
          <Link to="/" className="logout-link" onClick={this.handleLogout}>Logout</Link>
        </div>
      
      favoriteLink = 
        <NavLink exact to="/favorites" className="nav-link favorite-link" onClick={this.goToFavorites}>
          FAVORITES
        </NavLink>

      watchLink = 
        <NavLink exact to="/watchlist" className="nav-link watchlist-link" onClick={this.goToWatchlist}>
          WATCHLIST
        </NavLink>
    }

    const loginDropdown =
      <article className="login-dropdown">
        <LoginForm hideLogin={this.hideLogin} />
      </article>

    return (
      <nav className="Nav">
        <div className="nav-left">
          <Link
            to="/"
            className="main-heading"
            onClick={() => this.props.resetMovies("discover")}
          >
            <h1>MOVIE TRACKER</h1>
          </Link>
          <div className="main-nav-wrapper">
            <NavLink
              exact
              to="/"
              className="nav-link explore-link"
              onClick={() => this.props.resetMovies("discover")}
            >
              EXPLORE
            </NavLink>
            {favoriteLink}
            {watchLink}
          </div>
        </div>
        {accountNav}
        {this.state.showLogin && loginDropdown}
      </nav>
    );
  }
}

export const mapStateToProps = (state) => ({
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  resetMovies: fetchCase => dispatch(fetchMovies(fetchCase)),
  displayFavorites: (favorites) => dispatch(addFavoriteMovies(favorites)),
  displayWatchlist: (watchlist) => dispatch(addWatchlistMovies(watchlist))
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

Nav.propTypes = {
  isplayFavorites: PropTypes.func,
  displayWatchlist: PropTypes.func,
  logoutUser: PropTypes.func,
  resetMovies: PropTypes.func,
  user: PropTypes.object
}

