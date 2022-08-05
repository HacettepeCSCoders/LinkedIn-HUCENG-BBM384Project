import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {getAcademicianById, getGraduateById, getStudentById} from "../../api/apiCalls";

const AnnouncementListItem = (props) => {
    const {announcement} = props;

    const {username:onLoggedUsername,id,token,role} = useSelector(store => ({
        username: store.username,
        id: store.id,
        token: store.token,
        role:store.role[0],
    }));

    const [publisher,setPublisher] = useState();

    useEffect( () => {
        const load = async () => {
            try {
                const response = await getStudentById(token, announcement.publisherId);
                setPublisher(response.data);
                return;
            } catch (error) {
                console.log(error);
            }

            try {
                const response = await getAcademicianById(token, announcement.publisherId);
                setPublisher(response.data);
                console.log(publisher);
                return;
            } catch (error) {
                console.log(error);
            }

            try {
                const response = await getGraduateById(token, announcement.publisherId);
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

                    <a className="list-group-item list-group-item-action flex-column align-items-start" onClick={onClickJob}>
                        {publisher &&
                        <div class="row">
                            <div className="col-2">
                                {publisher.name} {publisher.surname}
                            </div>
                            <div className="col-2">
                                {announcement.created}
                            </div>
                        </div>}
                        <div>
                            { show &&
                            <div className="col-3">
                                {announcement.content}
                            </div>}
                            {show && <div className="col-3">
                            {announcement.content}
                                </div>}

                        </div>
                    </a>

        </div>
    );
};

export default AnnouncementListItem;