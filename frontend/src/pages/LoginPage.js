import React from "react";
import { login } from "../apiCalls";
import { Link } from "react-router-dom";
import HomePage from "./HomePage.js";
import { withApiProgress } from "../shared/ApiProgress";
import { withTranslation } from "react-i18next";

import "../designs/SignupPage.css";
import axios from "axios";
class UserLoginPage extends React.Component {
  state = {
    username: null,
    password: null,
    error: null,
    pendingApiCall: false,
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onClickLogin = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { onLoginSuccess } = this.props;
    const creds = {
      username,
      password,
    };

    const { push } = this.props.history;

    if (creds[username] === "user1") {
      onLoginSuccess(username);
    }
    try {
      await login(creds);
    } catch (apiError) {
      this.setState({
        error: "hata",
      });
    }
  };

  render() {
    const { t, pendingApiCall } = this.props;
    const { username, password, error } = this.state;
    return (
      <div className="signup-form">
        <form>
          <h1 className="text-center" style={{marginTop:"-15px"}}>Log In</h1>
          <div className="form-group input-group">
            <span class="input-group-addon">
              <i class="fa fa-user"></i>
            </span>
            <input
              type="text"
              class="form-control"
              name="username"
              placeholder="Email"
              required="required"
              onChange={this.onChange}
            />
          </div>
          <div className="form-group input-group">
            <span class="input-group-addon">
              <i class="fa fa-lock"></i>
            </span>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              required="required"
              onChange={this.onChange}
            />
          </div>
          {this.state.error && (
            <div className="alert alert-danger">{this.state.error}</div>
          )}
          <div className="text-center form-group">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              onClick={this.onClickLogin}
              disabled={this.state.pendingApiCall}
              component={Link}
              to="\homepage"
            >
              Log In
            </button>
          </div>
          <Link className="navbar-brand" to="/signup" style={{marginLeft:"3px", marginTop:"-17px"}}>
            Don't you have an account? Sign Up
          </Link>
        </form>
      </div>
    );
  }
}

export default UserLoginPage;
