import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSignIn } from '../../api/fetchSignIn';
import { updateUser } from '../../actions';

export class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    fetchSignIn(email, password)
      .then(user => {
        this.props.updateUser(user.id, user.name);
        this.props.hideLogin();
      })
      .catch(error => {
        this.setState({
          error: true,
          password: ""
        });
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
        <label htmlFor="email-input">Email</label>
        <input 
          type="text" 
          id="email-input"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <label htmlFor="password-input">Password</label>
        <input 
          type="password" 
          id="password-input"
          name="password" 
          value={this.state.password}
          onChange={this.handleChange}
        />
        {this.state.error && 
          <p className='error-message'>Incorrect password. Please try again.</p>
        }
        <button type="submit" className="submit-btn">Submit</button>
        <p>
          Not a member? <Link to="/signup" className="signup-link" onClick={this.props.hideLogin}>Create an account</Link>
        </p>
      </form>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  updateUser: (id, name) => dispatch(updateUser(id, name))
});

export default connect(null, mapDispatchToProps)(LoginForm);

