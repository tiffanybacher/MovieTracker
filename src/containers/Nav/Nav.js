import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from '../../containers/LoginForm/LoginForm';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser, addFavoriteMovies } from '../../actions';
import { fetchMovies } from '../../thunks/fetchMovies';
import { fetchUserFavorites } from '../../api/fetchUserFavorites';
import { cleanAllMovies } from '../../api/cleaners';

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
      console.log('Must be logged in to view favorites');
    } else if (this.props.user.id && !this.props.user.favorites.length) {
      console.log('Logged in but no favorites');
      this.props.displayFavorites([]);
    } else {
      console.log('Logged in and favorites are true');
      fetchUserFavorites(this.props.user.id)
        .then(result => cleanAllMovies(result))
        .then(movies => this.props.displayFavorites(movies));
    }
  }

  render() {
    const { name } = this.props.user;
    let accountNav;
    let loginActive = '';

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
              to="/"
              className="nav-link"
              onClick={() => this.props.resetMovies("discover")}
            >
              EXPLORE
            </NavLink>
            <NavLink to="/favorites" className="nav-link" onClick={this.goToFavorites}>
              FAVORITES
            </NavLink>
            <NavLink to="/watchlist" className="nav-link">
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
  displayFavorites: (favorites) => dispatch(addFavoriteMovies(favorites))
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);