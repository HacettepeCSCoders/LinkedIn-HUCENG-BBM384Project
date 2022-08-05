import React from "react";
import "./App.css";
import UserSignupPage from "./pages/SignupPage";
import UserLoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import TopBar from "./components/TopBar";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    username: undefined,
  };

  onLoginSuccess = (username) => {
    this.setState({ username, isLoggedIn: true });
  };
  render() {
    const { isLoggedIn, username } = this.state;
    return (
      <div>
        <Router>
          <TopBar username={username} isLoggedIn={isLoggedIn} />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route
              path="/login"
              component={(props) => {
                return (
                  <UserLoginPage
                    {...props}
                    onLoginSuccess={this.onLoginSuccess}
                  />
                );
              }}
            />
            <Route path="/signup" component={UserSignupPage} />
            <Route path="/homepage" component={HomePage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
