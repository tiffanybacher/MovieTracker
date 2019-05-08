import React, { Component } from "react";
import { Link } from "react-router-dom";

class LoginForm extends Component {
  render() {
    return (
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <p>
          Not a member? <Link>Create an account</Link>
        </p>
      </form>
    );
  }
}

export default LoginForm;