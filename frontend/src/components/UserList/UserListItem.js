import React from 'react';
import {Link} from "react-router-dom";
import profilePic from "../../assets/profilePic.png";


const UserListItem =  (props) => {
    const {user} = props;
    let type;
    if(user.type === undefined) {
        type = "GRADUATE";
    }else{
        type = user.type;
    }
    return (
        <Link to={`/user/${user.username}`} className="list-group-item list-group-item-action">
            <img className="rounded-circle" width="32" height="32" alt={`${user.username} profile`} src={profilePic} />
            <span className="pl-2"> {`${user.name} ${user.surname} ${type}`}</span>
                
        </Link>
    );

}

export default UserListItem;