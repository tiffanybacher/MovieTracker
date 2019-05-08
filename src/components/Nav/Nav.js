import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';

class Nav extends Component {
  constructor() {
    super()
    this.state = {
      showLogin: false
    }
  }

  toggleLogin = () => {
    this.setState({ showLogin: !this.state.showLogin });
  }
  render() {
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
        <div className="account-wrapper">
          <p 
            className="login-link nav-link"
            onClick={this.toggleLogin}
          >
            LOGIN
          </p>
          <NavLink to="/signup" className="nav-link">
            SIGN UP
          </NavLink>
        </div>
        {this.state.showLogin && <LoginForm />}
      </nav>
    );
  }
}

export default Nav;