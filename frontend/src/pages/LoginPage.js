import React from "react";
import { Link } from "react-router-dom";
import "../designs/SignupPage.css";
import {withApiProgress} from "../shared/ApiProgress";
import {connect} from "react-redux";
import {loginHandler, loginSuccess} from "../redux/AuthActions";

class LoginPage extends React.Component {

  state = {
    username: null,
    password: null,
    error: null,
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: null,
    });
  };

  onClickLogin = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const creds = {
      username,
      password,
    };

    const {history, dispatch} = this.props
    const {push} = history;

    this.setState({
      error: null,
    });

    try {
      await dispatch(loginHandler(creds));
      push("/homepage");
    } catch (apiError) {
      console.log(apiError);
      console.log(apiError.response.data.message);
      this.setState({
        error: apiError.response.data.message,
      });
    }
  };

  render() {
    const { t, pendingApiCall } = this.props;
    const { username, password, error } = this.state;
    const buttonEnabled = username && password ;
    return (
        <div className="signup">
      <div className=" signup-form">
        <form>
          <h1 className="text-center" style={{marginTop:"-15px"}}>Log In</h1>
          <div className="form-group input-group">
            <span className="input-group-addon">
              <i className="fa fa-user"/>
            </span>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Email"
              required="required"
              onChange={this.onChange}
            />
          </div>
          <div className="form-group input-group">
            <span className="input-group-addon">
              <i className="fa fa-lock"/>
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
          <Link to="/ForgotPasswordRequestPage">
            <p className="forgot-password text-right"> Forgot password? </p>
          </Link>

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}
          <div className="text-center form-group">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              onClick={this.onClickLogin}
              disabled={!buttonEnabled || pendingApiCall}
              component={Link}
              to="\homepage"
            >
              {pendingApiCall && (
                  <span className="spinner-border spinner-border-sm"/>
              )}
              Log In
            </button>

          </div>
          <Link className="navbar-brand" to="/signup" style={{marginLeft:"3px", marginTop:"-17px"}}>
            Don't you have an account? Sign Up
          </Link>
        </form>
      </div>
        </div>
    );
  }
}

const LoginPageWithApiProgress = withApiProgress(LoginPage,'http://localhost:8080/api/login')

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginSuccess: (auth) => {
      return dispatch(loginSuccess(auth))
    }
  }
}
export default connect()(LoginPageWithApiProgress);
