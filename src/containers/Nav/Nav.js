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
      showLogin: false,
    }
  }

  toggleLogin = () => {
    this.setState({ showLogin: !this.state.showLogin });
  }

  hideLogin = () => {
    this.setState({ showLogin: false })
  }

  handleLogout = () => {
    this.props.logoutUser();
  }

  render() {
    const { name } = this.props.user;
    let accountNav;

    if (!this.props.user.name) {
      accountNav =
        <div className="nav-right">
            <a 
              href="#"
              className="login-link nav-link"
              onClick={this.toggleLogin}>
              LOGIN
            </a>
            <NavLink to="/signup" className="nav-link" onClick={this.hideLogin}>
              SIGN UP
            </NavLink>
          </div>
    } else {
      accountNav =
        <div className="nav-right">
          <p className="userGreeting">Hi, {name}!</p>
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
        <Link to="/" className="main-header"><h1>MOVIE TRACKER</h1></Link>
          <div className="main-nav-wrapper">
            <NavLink to="/" className="nav-link">
              EXPLORE
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
        {this.state.showLogin && loginDropdown}
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