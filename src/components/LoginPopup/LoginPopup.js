import React, { Component } from 'react';
import { LoginForm } from '../../containers/LoginForm/LoginForm';

class LoginPopup extends Component {
  render() {
    return(
      <div className="LoginPopup">
        <h3>Please login</h3>
        <p>You must be logged in to view your favorites</p>
        <LoginForm />
      </div>
    );
  }
}

export default LoginPopup;