import React from "react";
import { Link } from "react-router-dom";
import "../designs/SignupPage.css";
import { withApiProgress } from "../shared/ApiProgress";
import { connect } from "react-redux";
import { loginHandler, loginSuccess } from "../redux/AuthActions";

class ForgotPasswordPage extends React.Component {

    state = {
        username: null,
    };

    onClickLogin = async (event) => {
        const creds = {

        }

    };

    render() {
        const { t, pendingApiCall } = this.props;
        const {username } = this.state;
        return (
            <div className="signup">
                <div className=" signup-form">
                    <form>
                        <h1 className="text-center" style={{ marginTop: "-15px" }}>Password Reset</h1>
                        <div className="form-group input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-user" />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="Email"
                                required="required"
                                disabled={!username}
                                onChange={(event) =>
                                    this.setState({username: event.target.value})}
                            />
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

const LoginPageWithApiProgress = withApiProgress(ForgotPasswordPage, 'http://localhost:8080/api/login')

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginSuccess: (auth) => {
            return dispatch(loginSuccess(auth))
        }
    }
}
export default connect()(LoginPageWithApiProgress);
