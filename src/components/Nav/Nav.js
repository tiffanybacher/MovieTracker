import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from '../../containers/LoginForm/LoginForm';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions';

class Nav extends Component {
  constructor() {
    super();

    this.state = {
      showLogin: false
    }
  }

  toggleLogin = () => {
    this.setState({ showLogin: !this.state.showLogin });
  }

  handleLogout = () => {
    this.props.logoutUser();
  }

  render() {
    let accountNav;
    const { name } = this.props.user;

    if (!this.props.user.name) {
      accountNav =
        <div className="account-wrapper">
            <p 
              className="login-link nav-link"
              role="link"
              onClick={this.toggleLogin}
            >
              LOGIN
            </p>
            <NavLink to="/signup" className="nav-link">
              SIGN UP
            </NavLink>
          </div>
    } else {
      accountNav =
        <div className="account-wrapper">
          <p className="userGreeting">Hi, {name}!</p>
          <Link to="/" className="logout-link" onClick={this.handleLogout}>Logout</Link>
        </div>
    }

    return (
      <nav className="Nav">
        <div className="nav-left">
          <img src="" alt="Logo" />
          <div className="main-nav-wrapper">
            <NavLink to="/" className="nav-link">
              DISCOVER
            </NavLink>
            <NavLink to="/favorites" className="nav-link">
              FAVORITES
            </NavLink>
            <NavLink to="/watchlist" className="nav-link">
              WATCHLIST
            </NavLink>
          </div>
        </div>
        {accountNav}
        {this.state.showLogin && <LoginForm toggleLogin={this.toggleLogin} />}
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav);