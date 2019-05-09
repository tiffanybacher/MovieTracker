import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchNewUser } from '../../api/fetchNewUser';
import { connect } from 'react-redux';
import { updateUser } from '../../actions';

class SignUpForm extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    passwordConfirm: ''
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    const { email, name, password } = this.state;

    e.preventDefault();

    fetchNewUser(email, name, password)
      .then(id => this.props.updateUser(id, name));
  }

  render() {
    return (
      <div className="SignUpForm">
        <h2>Sign up for an account</h2>
        <p>Sign up is free and easy! Fill out the form below to get started.</p>
        <form
          onSubmit={this.handleSubmit}
          className="signup-form-inputs"
        >
          <label htmlFor="signup-email-input">Email</label>
          <input 
            type="text" 
            id="signup-email-input"
            name="email"
            value={this.state.email} 
            onChange={this.handleChange}
          />
          <label htmlFor="signup-name-input">Name</label>
          <input 
            type="text" 
            id="signup-name-input"
            name="name"
            value={this.state.name} 
            onChange={this.handleChange}
          />
          <label htmlFor="signup-password-input">Password</label>
          <input 
            type="password" 
            id="signup-password-input"
            name="password" 
            value={this.state.password}
            onChange={this.handleChange}
          />
          <label htmlFor="password-confirm-input">Confirm Password</label>
          <input 
            type="password" 
            id="password-confirm-input"
            name="passwordConfirm" 
            value={this.state.passwordConfirm}
            onChange={this.handleChange}
          />
          <div className="signup-btn-wrapper">
            <button type="submit" className="signup-btn btn">Sign Up</button>
            <Link to="/" className="cancel-link">Cancel</Link>
          </div>
        </form>
        <article className="signup-blurb">
          <h3>Why Sign Up?</h3>
          <div className="signup-sub-blurb">
            <p>As a member you can:</p>
            <ul>
              <li>Log movies you have watched</li>
              <li>Keep track of favorite movies</li>
              <li>Build and maintain an watchlist</li>
            </ul>
          </div>
        </article>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  updateUser: (id, name) => dispatch(updateUser(id, name))
});

export default connect(null, mapDispatchToProps)(SignUpForm);