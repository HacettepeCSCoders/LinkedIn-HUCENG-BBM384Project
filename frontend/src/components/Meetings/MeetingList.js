import React, {useEffect, useState} from 'react';
import {getAllMeetings} from "../../api/apiCalls";
import {useSelector} from "react-redux";
import meeting from "../../assets/meeting.png";
import JobListItem from "../Job/JobListItem";
import MeetingListItem from "./MeetingListItem";

const MeetingList = (props) => {
    const [meetingPage, setMeetingPage] = useState([]);

    const {id,token} = useSelector(store => ({
        id: store.id,
        token: store.token,
    }));

    useEffect( () => {
        const loadMeetings = async () => {
            try {
                const response = await getAllMeetings(token);
                setMeetingPage(response.data);

            } catch (error) {
                console.log(error);
            }
        };
        loadMeetings();
    },[]);

    if(meetingPage.length === 0) {
        console.log(meetingPage.length);
        return (<div className="alert alert-info text-center">
            <img className="img-fluid"  alt="profile"  width="1000" height="1000" src={meeting} />
            <p className = "font-weight-bold"> There is no meetings.</p>
        </div> );
    }

    return (
        <div>
            <ul className="list-group">
                {meetingPage.map(meeting=> {
                    return <MeetingListItem key={meeting.id} meeting = {meeting}/>;
                })}
            </ul>
        </div>
    );
};

export default MeetingList;