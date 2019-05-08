import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSignIn } from '../../api/fetchSignIn';
import { updateUser } from '../../actions'

export class LoginForm extends Component {
  constructor() {
    super() 
    this.state = {
      username: '',
      password: ''
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    fetchSignIn(username, password)
      .then(user => this.props.updateUser(user.id, user.name))
    this.setState({
      username: '',
      password: ''
    })
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  } 

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="username">Username</label>
        <input 
          type="text" 
          id="username"
          value={this.state.username} 
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password" 
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button type='submit'>Submit</button>
        <p>
          Not a member? <Link to='/signup'>Create an account</Link>
        </p>
      </form>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  updateUser: (id, name) => dispatch(updateUser(id, name))
});

export default connect(null, mapDispatchToProps)(LoginForm);

