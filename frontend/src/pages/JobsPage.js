import React from 'react';
import ShareJobAnnouncement from "../components/Job/ShareJobAnnouncement";
import {useSelector} from "react-redux";
import JobList from "../components/Job/JobList";
import "../designs/JobsPage.css";

const JobsPage= (props) => {

    const {role} = useSelector(store => ({
        role:store.role[0],
    }))

    let share = true;
    if(role === "ROLE_STUDENT"){
        share = false;

    }

    return (
        <div className="container">
            <div>
                {share && <ShareJobAnnouncement/>}
            </div>
            <div >
                <JobList/>
            </div>
        </div>
    );

}

export default JobsPage;