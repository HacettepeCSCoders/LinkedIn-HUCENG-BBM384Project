import React, {useEffect, useState} from 'react';
import MeetingList from "../components/Meetings/MeetingList"
import {getPhoto} from "../api/apiCalls";
import {useSelector} from "react-redux";
const MeetingPage = () => {
    const {username: loggedInUsername ,role: loggedInRole ,token,id} = useSelector(store=> ({
        username: store.username ,
        role: store.role[0],
        token: store.token,
        id: store.id,
    }));
    const [photo,setPhoto] = useState([]);
    const [data,setData] = useState("");

    const onClickPhoto = () => {

    }
    useEffect( () => {
       /* const loadPhoto = async () => {
            try {
                const response = await getPhoto(token, "627d69f61fccd6754665897a");
                console.log(response.data);
                setPhoto(response.data);
            } catch (error) {
                console.log(error);
            }
            const data = photo.image.data;

            setData(data);

        }
        loadPhoto();*/

    },[])


    /*const Example = ({ data }) => (<img src={`data:image/jpeg;base64,${data}`} />)*/
    return (
        <div className="container">
            <MeetingList/>
        </div>
    );
};

export default MeetingPage;