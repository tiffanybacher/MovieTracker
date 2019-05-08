import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSignIn } from '../../api/fetchSignIn';
import { updateUser } from '../../actions';

export class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    fetchSignIn(username, password)
      .then(user => this.props.updateUser(user.id, user.name));

    this.props.toggleLogin();

    this.setState({
      username: '',
      password: ''
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  } 

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="LoginForm"
      >
        <label htmlFor="username-input">Username</label>
        <input 
          type="text" 
          id="username-input"
          name="username"
          value={this.state.username} 
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password-input"
          name="password" 
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button type="submit" className="submit-btn">Submit</button>
        <p>
          Not a member? <Link to="/signup" className="signup-link">Create an account</Link>
        </p>
      </form>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  updateUser: (id, name) => dispatch(updateUser(id, name))
});

export default connect(null, mapDispatchToProps)(LoginForm);

