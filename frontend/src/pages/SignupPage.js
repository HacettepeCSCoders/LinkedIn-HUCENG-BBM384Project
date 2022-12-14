import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import "../designs/SignupPage.css";
import {signup} from "../api/apiCalls";
import {withApiProgress} from "../shared/ApiProgress";
import {Link} from "react-router-dom";
import Topbar from "../components/TopBar";


class SignupPage extends React.Component {

  state = {
    username: null,
    userType: null,
    name: null,
    surname: null,
    dateOfBirth: null,
    password: null,
    error: null,
    errors: {},
    pendingApiCall: null,
    success: null
  };

  showOption = (event,target) =>{
    if(event==target)
      return true;
  }

  onChange = (event) => {
    const { name, value } = event.target;
    const errors = {...this.state.errors};
    errors[name] = undefined;
    if(name === "password" || name === "passwordRepeat"){
      if(name === "password" && value !== this.state.passwordRepeat ){
        this.setState({
          error: "Password Mismatch",
        })
      }else if(name === "passwordRepeat" && value !== this.state.password ){
        this.setState({
          error: "Password Mismatch",
        })
      }else{
        this.setState({
          error: undefined,
        })
      }
    }
    this.setState({

      [name]: value,
      errors,
    });
  };
  handleSelect = (e,event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
  }
  handleSelectD1 = (e) => {
    this.setState({

      userType: e,
    });
  };
  handleSelectD11 = (e) => {
    this.setState({

      academicianType: e,
    });
  };
  handleSelectD12 = (e) => {
    this.setState({

      studentType: e,
    });
  };
  onClickSignup =  async event => {
    event.preventDefault();

    const { username, userType, name, surname, dateOfBirth, password } = this.state;
    const body = {
      username,
      userType,
      name,
      surname,
      dateOfBirth,
      password
    };

    if(body.userType === "Academician"){
      body.userType = 3;
      body.academicianType = this.state.academicianType;
      if(body.academicianType === "Research Assistant"){
        body.academicianType =0;
      }
      else if(body.academicianType === "Instructor"){
        body.academicianType =1;
      }
      else if(body.academicianType === "Associate Professor"){
        body.academicianType =2;
      }
      else if(body.academicianType === "Professor"){
        body.academicianType =3;
      }
    }
    else if(body.userType === "Graduate"){
      body.userType = 2;
      body.companyName = this.state.companyName;
    }
    else if(body.userType === "Student"){
      body.userType = 1;
      body.studentNumber = this.state.studentNumber;
      body.studentType = this.state.studentType;
      if(body.studentType === "Bachelors"){
        body.studentType =0;
      }
      else if(body.studentType === "Master"){
        body.studentType =1;
      }
      else if(body.studentType === "PHD"){
        body.studentType =2;
      }

    }

    let cond = true;
    for(const property in body){
      if(body[property] == null || body[property] === ""){
        this.setState({
          error: "You must fill in all the blanks to log in."
        })
        cond = false;
        break;
      }else{
        this.setState({
          error: null
        })
      }
    }

    if(this.state.error != null){
      cond = false;
    };

    const {push} = this.props.history;

    if(cond){
      this.setState({
        pendingApiCall: false,
      });

      try{
        console.log("Post sent");
        const response = await signup(body);
        this.setState({
          success: true,
        })
        setTimeout(() =>{push("/login");},2000);
      } catch(error){
        console.log(error.response.data);
        if(error.response.data.validationErrors){
          this.setState({errors: error.response.data.validationErrors})
        }
      }

      this.setState({
        pendingApiCall: false,
      });
    }
  };

  render() {
    const {pendingApiCall, errors} = this.state;
    const {username, name} = errors;
    return (
      <div className="signup">
        <div className="signup-form">
          <form>
            <h1 className="text-center" style={{marginTop:"-15px", paddingBottom:"8px"}}>Sign Up</h1>
            <div className="form-group input-group">
            <span className="input-group-addon">
              <i class="fa fa-user"/>
            </span>
              <input
                type="text"
                className={username ? "form-control is-invalid":"form-control"}
                name="username"
                placeholder="Username"
                onChange={this.onChange}
              />
              <div className="invalid-feedback">{username}</div>
            </div>
            <div className="form-group input-group">
            <span class="input-group-addon">
              <i className="fa fa-user"/>
            </span>
              <input
                type="text"
                name="name"
                className={name ? "form-control is-invalid":"form-control"}
                placeholder="Name"
                onChange={this.onChange}
              />
              <div className="invalid-feedback">{name}</div>
            </div>
            <div className="form-group input-group">
            <span className="input-group-addon">
              <i className="fa fa-user"/>
            </span>
              <input
                type="text"
                name="surname"
                className="form-control"
                placeholder="Surname"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group input-group">
            <span class="input-group-addon">
              <i class="fa fa-lock"/>
            </span>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group input-group">
            <span class="input-group-addon">
              <i class="fa fa-lock"/>
              <i class="fa fa-check"/>
            </span>
              <input
                type="password"
                name="passwordRepeat"
                className="form-control"
                placeholder="Confirm Password"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group input-group">
            <span class="input-group-addon">
              <i class="fa fa-calendar" aria-hidden="true"/>
            </span>
              <input
                type="date"
                name="dateOfBirth"
                className="form-control"
                placeholder="Birth Date"
                onChange={this.onChange}
                max='2010-01-01'
              />
            </div>

            <div className="form-group">
              <DropdownButton
                id="dropdown-basic-button"
                title="User Status"
                onSelect={this.handleSelectD1}
              >
                <Dropdown.Item eventKey="Academician">Academician</Dropdown.Item>
                <Dropdown.Item eventKey="Student">Student</Dropdown.Item>
                <Dropdown.Item eventKey="Graduate">Graduate</Dropdown.Item>
              </DropdownButton>
            </div>
            {this.showOption(this.state.userType,"Academician") ? (

              <div className="form-group">
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Academician Degree"
                  onSelect={this.handleSelectD11}
                >
                  <Dropdown.Item eventKey="Research Assistant">Research Assistant</Dropdown.Item>
                  <Dropdown.Item eventKey="Instructor">Instructor</Dropdown.Item>
                  <Dropdown.Item eventKey="Associate Professor">Associate Professor</Dropdown.Item>
                  <Dropdown.Item eventKey="Professor">Professor</Dropdown.Item>
                </DropdownButton>
              </div>
            ) : (
              ""
            )
            }
            {this.showOption(this.state.userType,"Student") ? (
              <div className="form-group">
                <div className="form-group">
                  <DropdownButton
                    id="dropdown-basic-button"
                    title="Student Degree"
                    onSelect={this.handleSelectD12}
                  >
                    <Dropdown.Item eventKey="Bachelors">Bachelors</Dropdown.Item>
                    <Dropdown.Item eventKey="Master">Master</Dropdown.Item>
                    <Dropdown.Item eventKey="PHD">PHD</Dropdown.Item>
                  </DropdownButton>
                </div>
                <div className="form-group input-group">
                <span class="input-group-addon">
                  <i class="fa fa-id-card" aria-hidden="true"/>
                </span>
                  <input
                    type="text"
                    name="studentNumber"
                    className="form-control"
                    placeholder="Student Number"
                    onChange={this.onChange}
                  />
                </div>
              </div>
            ) : (
              ""
            ) }
            {this.showOption(this.state.userType,"Graduate")?(
              <div className="form-group input-group">
               <span class="input-group-addon">
                 <i class="fa fa-building-o"/>
               </span>
                <input
                  type="text"
                  name="companyName"
                  className="form-control"
                  placeholder="Company Name"
                  onChange={this.onChange}
                />
              </div>
            ): (
              ""
            )}
            {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
            {this.state.success && <div className="alert alert-success">You have been directed to Login Page.
              After your registration is confirmed, you can login.</div>}

            <div className="text-center form-group">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                onClick={this.onClickSignup}
                disabled={pendingApiCall}
              >
                {this.state.pendingApiCall ? (
                  <span className="spinner-border spinner-border-sm"/>
                ) : (
                  ""
                )}
                Sign Up
              </button>
            </div>
            <Link className="navbar-brand" to="/login" style={{marginLeft:"3px", marginTop:"-17px"}}>
              Already have an account? Login
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

const SignupPagewithApiProgress = withApiProgress(SignupPage,'http://localhost:8080/api/v1/registration');
export default SignupPagewithApiProgress;
