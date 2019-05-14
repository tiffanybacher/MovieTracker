import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from '../../containers/LoginForm/LoginForm';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser, addFavoriteMovies, addWatchlistMovies } from '../../actions';
import { fetchMovies } from '../../thunks/fetchMovies';
import { fetchUserFavorites } from '../../api/fetchUserFavorites';
import { cleanAllMovies } from '../../api/cleaners';
import { Redirect } from 'react-router-dom';

class Nav extends Component {
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
    if (!this.props.user.id) {
      alert('Must be logged in to view Favorites');
    } else if (this.props.user.id && !this.props.user.favorites.length) {
      this.props.displayFavorites([]);
    } else {
      fetchUserFavorites(this.props.user.id)
        .then(result => cleanAllMovies(result))
        .then(movies => this.props.displayFavorites(movies));
    }
  }

  goToWatchlist = () => {
    if (!this.props.user.id) {
      alert('Must be logged in to view Watchlist');
    } else if (this.props.user.id && !this.props.user.watchlist) {
      this.props.displayWatchlist([]);
    } else {
      console.log('Create fetchUserWatchlist')
      // fetchUserWatchlist(this.props.user.id)
      //   .then(result => cleanAllMovies(result))
      //   .then(movies => this.props.displayWatchlist(movies));
    }
  }

  render() {
    const { name } = this.props.user;
    let accountNav;
    let loginActive;
    let favoriteLink = '/favorites';
    let watchLink = '/watchlist';

    if (this.state.showLogin) {
      loginActive = 'active';
    }

    if (!this.props.user.name) {
      accountNav =
        <div className="nav-right">
            <a 
              href="#"
              className={`login-link nav-link ${loginActive}`}
              onClick={this.toggleLogin}>
              LOGIN
            </a>
            <NavLink to="/signup" className="nav-link" onClick={this.hideLogin}>
              SIGN UP
            </NavLink>
          </div>

        favoriteLink = '/login';
        watchLink = '/login';
    } else {
      accountNav =
        <div className="greeting-wrapper">
          <p className="user-greeting">HI, {name.toUpperCase()}!</p>
          <Link to="/" className="logout-link" onClick={this.handleLogout}>Logout</Link>
        </div>
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
              className="nav-link"
              onClick={() => this.props.resetMovies("discover")}
            >
              EXPLORE
            </NavLink>
            <NavLink exact to={favoriteLink} className="nav-link" onClick={this.goToFavorites}>
              FAVORITES
            </NavLink>
            <NavLink exact to={watchLink} className="nav-link" onClick={this.goToWatchlist}>
              WATCHLIST
            </NavLink>
          </div>
        </div>
        {accountNav}
        {this.state.showLogin && loginDropdown}
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  resetMovies: fetchCase => dispatch(fetchMovies(fetchCase)),
  displayFavorites: (favorites) => dispatch(addFavoriteMovies(favorites)),
  displayWatchlist: (watchlist) => dispatch(addWatchlistMovies(watchlist))
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);