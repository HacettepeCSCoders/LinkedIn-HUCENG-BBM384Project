import React from "react";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import MainPage from "../pages/MainPage";
import TopBar from "../components/TopBar";
import Dashboard from "../pages/Dashboard"
import JobsPage from "../pages/JobsPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import { useSelector } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import MeetingPage from "../pages/MeetingPage";
import AnnouncementPage from "../pages/AnnouncementPage";
import Sidebar from "../components/Post/SideBar";



const App = () => {
  const { isLoggedIn } = useSelector(store => ({
    isLoggedIn: store.isLoggedIn,
  }));
  return (
    <div>
      <Router>
        <TopBar />
        <Switch>
          <Route exact path="/" component={MainPage} />
          {!isLoggedIn && <Route path="/login" component={LoginPage} />}
          {!isLoggedIn && <Route path="/signup" component={SignupPage} />}
          {!isLoggedIn && <Route path="/ForgotPasswordRequestPage" component={ForgotPasswordPage} />}
          {!isLoggedIn && <Route path="/ResetPasswordRequestPage" component={ResetPasswordPage} />}
          {isLoggedIn && <Route path="/homepage" component={HomePage} />}
          {isLoggedIn && <Route path="/user/:username" component={ProfilePage} />}
          {isLoggedIn && <Route path="/dashboard" component={Dashboard} />}
          {isLoggedIn && <Route path="/jobs" component={JobsPage} />}
          {isLoggedIn && <Route path="/meetings" component={MeetingPage} />}
          {isLoggedIn && <Route path="/announcements" component={AnnouncementPage} />}


          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );

}


export default App;
