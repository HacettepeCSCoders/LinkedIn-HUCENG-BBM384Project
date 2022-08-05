import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/AuthActions.js";
import homepagePic from "../assets/homepage.png";
import profilePic from "../assets/profilePic.png";
import jobsPic from "../assets/jobs.png";

const TopBar = (props) => {

    const { username, isLoggedIn, role, name, surname } = useSelector(store => ({
        isLoggedIn: store.isLoggedIn,
        username: store.username,
        name: store.name,
        surname: store.surname,
        role: store.role,
    }))

    const dispatch = useDispatch();

    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
    }

    let profilePath;
    let displayName = name + surname;
    if (isLoggedIn && role[0] === "ROLE_ADMIN") {
        profilePath = "/dashboard";
        console.log(role);
    } else {
        profilePath = "/user/" + username;
        console.log(role);
    }
    let links = (
        <ul className="navbar-nav ml-auto">
            <li>
                <Link className="nav-link" to="/signup" style={{ paddingLeft: "8px" }}>
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
                <Link className="nav-link" to="/login" style={{ padding: "15px" }}>
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
            <li>
                <span style={{ paddingLeft: "500px" }} className="navbar-text text-md-center text-lg-end">
                    WELCOME TO LINKEDHU_CENG PLATFORM!
                </span>
            </li>
        </ul>
    );
    if (isLoggedIn) {
        links = (
            <div>
                <link rel="stylesheet" href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                <ul className="navbar-nav">
                    <li class="nav-item">
                        <Link className="nav-link" to="/homepage" style={{ paddingLeft: "875px" }}>
                            <button
                                className="btn btn-primary btn-md"
                                component={Link}
                            >
                                <img className="rounded-circle" width="32" height="32" alt="" src={homepagePic} />
                            </button>
                        </Link>
                    </li>

                    <li class="nav-item">
                        <Link className="nav-link" to={profilePath} style={{ paddingLeft: "8px" }}>
                            <button
                                type="submit"
                                className="btn btn-primary btn-md"
                                component={Link}
                            >
                                <span width="32" height="32">
                                    {displayName}
                                </span>
                            </button>
                        </Link>
                    </li>


                    <li >
                        <Link className="nav-link" to="/login" style={{ paddingLeft: "8px" }}>
                            <button
                                type="submit"
                                className="btn btn-primary btn-md"
                                component={Link}
                                onClick={onLogoutSuccess}
                            > <span className="material-symbols-outlined"> logout </span>
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }

    return (

        <nav className="navbar navbar-light ml-auto navbar-expand">
            <Link className="navbar-brand" to="/" style={{ paddingLeft: "50px" }}>
                <span className="mainLogo" >LinkedHU_CENG</span>
            </Link>
            <div class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                {links}
            </div>

        </nav>

    );

}

// const mapStateToProps = (store) => {
//     return {
//         isLoggedIn: store.isLoggedIn,
//         username: store.username,
//     }
// }
//
// const mapDispatchToProps = dispatch => {
//     return {
//         onLogoutSuccess: () =>{
//             return dispatch(logoutSuccess());
//         }
//     }
// }
//
// export default connect(mapStateToProps,mapDispatchToProps)(TopBar);

export default TopBar;

