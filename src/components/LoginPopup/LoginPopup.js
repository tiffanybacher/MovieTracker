import React, { Component } from 'react';
import PropTypes from 'prop-types'
import LoginForm from '../../containers/LoginForm/LoginForm';

class LoginPopup extends Component {
  render() {
    return(
      <div className="LoginPopup">
        <h3>Please login</h3>
        <p>You must be logged in to view your favorites or watchlist!</p>
        <LoginForm />
      </div>
    );
  }
}

export default LoginPopup;


LoginPopup.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};


