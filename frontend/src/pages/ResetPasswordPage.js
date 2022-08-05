import React from "react";
import { Link } from "react-router-dom";
import "../designs/SignupPage.css";
import { withApiProgress } from "../shared/ApiProgress";
import { connect } from "react-redux";
import { loginHandler, loginSuccess } from "../redux/AuthActions";

class ResetPasswordPage extends React.Component {

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

        const { history, dispatch } = this.props
        const { push } = history;

        this.setState({
            error: null,
        });

        try {
            await dispatch(loginHandler(creds));
            push("/homepage");
        } catch (apiError) {
            console.log(apiError);
            this.setState({
                error: apiError.response.data.message,
            });
        }
    };

    render() {
        const { t, pendingApiCall } = this.props;
        const { username, password, error } = this.state;
        const buttonEnabled = username && password;
        return (
            <div className="signup">
                <div className=" signup-form">
                    <form>
                        <h1 className="text-center" style={{ marginTop: "-15px" }}>Submit New Password</h1>
                        <div className="form-group input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-user" />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="New Password"
                                required="required"
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-user" />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="Confirm Password"
                                required="required"
                                onChange={this.onChange}
                            />
                        </div>


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
                                    <span className="spinner-border spinner-border-sm" />
                                )}
                                Submit
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const LoginPageWithApiProgress = withApiProgress(ResetPasswordPage, 'http://localhost:8080/api/login')

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginSuccess: (auth) => {
            return dispatch(loginSuccess(auth))
        }
    }
}
export default connect()(LoginPageWithApiProgress);
