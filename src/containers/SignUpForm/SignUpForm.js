import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchNewUser } from '../../api/fetchNewUser';
import { connect } from 'react-redux';
import { updateUser } from '../../actions';
import { fetchAllUsers } from '../../api/fetchAllUsers';

export class SignUpForm extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
    error: ' '
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, name, password, passwordConfirm } = this.state;

    this.setState({ error: ' ' });

    fetchAllUsers()
      .then(data => {
        this.checkEmail(data, email);
        this.checkPasswords(password, passwordConfirm);
        if (this.state.error === ' ') {
          fetchNewUser(email, name, password)
            .then(id => {
              this.props.updateUser(id, name);
              this.props.history.push("/");
            })
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));
  }

  checkEmail = (data, email) => {
    data.forEach(user => {
      if(user.email === email) {
        this.setState({ error: 'Email is already taken. Please try again.' });
      }
    });
  }

  checkPasswords = (password, passwordConfirm) => {
    if(password !== passwordConfirm) {
      this.setState({ error: 'Passwords do not match. Please try again.' });
    }
  }

  render() {
    let { error } = this.state;

    return (
      <div className="signup-backdrop">
        <div className="SignUpForm">
          <h2>Sign up for an account</h2>
          <h4>
            Sign up is free and easy! Fill out the form below to get
            started.
          </h4>
          <div className="flex-wrapper">
            <form
              onSubmit={this.handleSubmit}
              className="signup-form-inputs">
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
              <label htmlFor="password-confirm-input">
                Confirm Password
              </label>
              <input
                type="password"
                id="password-confirm-input"
                name="passwordConfirm"
                value={this.state.passwordConfirm}
                onChange={this.handleChange}
              />
              <div className="error-holder">
                <p className="error-message">{error}</p>
              </div>
              <div className="signup-btn-wrapper">
                <button type="submit" className="signup-btn btn">
                  Sign Up
                </button>
                <Link to="/" className="cancel-link">
                  Cancel
                </Link>
              </div>
            </form>
            <article className="signup-blurb">
              <h3>Why Sign Up?</h3>
              <div className="signup-sub-blurb">
                <p>As a member you can:</p>
                <ul>
                  <li>View details of any movie</li>
                  <li>Keep track of favorite movies</li>
                  <li>Build and maintain an watchlist</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  updateUser: (id, name) => dispatch(updateUser(id, name))
});

export default connect(null, mapDispatchToProps)(SignUpForm);

SignUpForm.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  updateUser: PropTypes.func
};


