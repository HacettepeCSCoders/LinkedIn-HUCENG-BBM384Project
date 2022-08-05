import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {getAcademicianById, getGraduateById, getStudentById} from "../../api/apiCalls";

const MeetingListItem = (props) => {
    const {meeting} = props;

    const [publisher , setPublisher] = useState();

    const {username:onLoggedUsername,id,token,role} = useSelector(store => ({
        username: store.username,
        id: store.id,
        token: store.token,
        role:store.role[0],
    }));

    useEffect( () => {
        const load = async () => {
            try {
                const response = await getStudentById(token, meeting.publisherId);
                setPublisher(response.data);
                return;
            } catch (error) {
                console.log(error);
            }

            try {
                const response = await getAcademicianById(token, meeting.publisherId);
                setPublisher(response.data);
                console.log(publisher);
                return;
            } catch (error) {
                console.log(error);
            }

            try {
                const response = await getGraduateById(token, meeting.publisherId);
                setPublisher(response.data);

                return;
            } catch (error) {
                console.log(error);
            }
        }
        load();

    }, []);

    const [show,setShow] = useState(false);

    const onClickJob = () => {
        setShow(!show);
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                <a className="list-group-item list-group-item-action flex-column align-items-start" onClick={onClickJob}>
                    {publisher &&
                        <div>
                        {publisher.name} {publisher.surname}
                        </div>}
                    <p> {meeting.meetingTime} </p>
                    <p>  {meeting.link}</p>
                </a>

                 </div>
                { show &&
                <div className="col-3">
                    {meeting.content}
                </div> }
                { show &&
                <div className="col-3">
                    <button className="btn btn-primary"> Attend </button>
                </div> }
            </div>
        </div>
    );
};

export default MeetingListItem;