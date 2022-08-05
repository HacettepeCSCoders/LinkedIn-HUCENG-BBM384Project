import React, { Component } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

class TopBar extends Component {
  render() {
    const { t, isLoggedIn, username } = this.props;

    let links = (
      <ul className="navbar-nav ml-auto">
        <li>
          <Link className="nav-link" to="/signup" style={{paddingLeft:"8px"}}>
          <button
              type="submit"
              className="btn btn-primary btn-md"
              component={Link}
              to="\signup"
            >
              Sign Up
            </button>
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/login" style={{padding:"15px"}}>
          <button
              type="submit"
              className="btn btn-primary btn-md"
              component={Link}
              to="\homepage"
            >
              Log In
            </button>
          </Link>
        </li>
      </ul>
    );
    if (isLoggedIn) {
      links = (
        <ul className="navbar-nav ml-auto">
          <li>
            <Link className="nav-link" to="/homepage">
            <button
              type="submit"
              className="btn btn-primary btn-md"
              component={Link}
              to="\homepage"
            >
              Log Out
            </button>
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/homepage">
              {username}
            </Link>
          </li>
        </ul>
      );
    }

    return (
      <div className="shadow-sm bg-light mb-2">
        <nav className="navbar navbar-light navbar-expand">
          <Link className="navbar-brand" to="/">
            <img src={logo} width="150" alt="logo" style={{marginTop:"-14px"}}/>
          </Link>
          {links}
        </nav>
      </div>
    );
  }
}

export default TopBar;
