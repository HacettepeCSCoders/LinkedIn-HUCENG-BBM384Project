import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {getAllAnnouncements} from "../../api/apiCalls";
import announcement from "../../assets/announcements.jpg";
import AnnouncementListItem from "./AnnouncementListItem";

const AnnouncementList = () => {
    const [announcementPage, setAnnouncementPage] = useState([]);

    const {id,token} = useSelector(store => ({
        id: store.id,
        token: store.token,
    }));

    useEffect( () => {
        const loadAnnouncements = async () => {
            try {
                const response = await getAllAnnouncements(token);
                setAnnouncementPage(response.data);

            } catch (error) {
                console.log(error);
            }
        };
        loadAnnouncements();
    },[]);

    if(announcementPage.length === 0) {
        console.log(announcementPage.length);
        return (<div className="alert alert-info text-center">
            <img className="img-fluid"  alt="profile" src={announcement} />
            <div> There is no announcement</div>
        </div> );
    }

    return (
        <div>
            <ul className="list-group">
                {announcementPage.map(announcement=> {
                     return <AnnouncementListItem key={announcement.id} announcement = {announcement}/>;
                })}
            </ul>
        </div>
    );
};

export default AnnouncementList;