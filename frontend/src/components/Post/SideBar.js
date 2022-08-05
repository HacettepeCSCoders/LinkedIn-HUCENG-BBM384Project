import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { Link } from "react-router-dom";

const SideBar = (props) => {

    const { username, isLoggedIn, role } = useSelector(store => ({
        isLoggedIn: store.isLoggedIn,
        username: store.username,
        role: store.role,
    }))





    let profilePath;
    if (isLoggedIn && role[0] === "ROLE_ADMIN") {
        profilePath = "/dashboard";
        console.log(role);
    } else {
        profilePath = "/user/" + username;
        console.log(role);
    }


    return (



        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link to={profilePath} className="link">
                            <li className="sidebarListItem active">
                                <LineStyle className="sidebarIcon" />
                                Profil
                            </li>
                        </Link>
                        <Link to="/jobs" className="link">
                            <li className="sidebarListItem active">
                                <LineStyle className="sidebarIcon" />
                                Jobs
                            </li>
                        </Link>
                        <Link to="/meetings" className="link">
                            <li className="sidebarListItem active">
                                <LineStyle className="sidebarIcon" />
                                Meetings
                            </li>
                        </Link>
                        <Link to="/announcements" className="link">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                Announcements
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default SideBar;