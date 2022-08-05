import React from 'react';
import {Link} from "react-router-dom";
import profilePic from "../../assets/profilePic.png";
import {updateAcademician, updateGraduate, updateStudent} from "../../api/apiCalls";
import {useSelector} from "react-redux";
import {getAllUsers} from "./GetAllUsers";

const NotApprovedUserListItem = (props) => {

    const {username: loggedInUsername ,role: loggedInRole ,token} = useSelector(store=> ({
        username: store.username ,
        role: store.role[0],
        token: store.token,
    }));

    const {user} = props;
    const {username,id,name,surname,date_of_birth} = user;
    const role = user.role;
    let type;
    if(user.type === undefined) {
        type = "GRADUATE";
    }else{
        type = user.type;
    }

    const onClickSend = async () => {
        const creds = {
            is_RequestUserDetails: false,
        }

        if (role === "ROLE_STUDENT") {
            console.log("Student");
            try {
                await updateStudent(token, creds,user.id);
            } catch (error) {
                console.log(error);
            }
        } else if (role === "ROLE_GRADUATE") {
            try {
                await updateGraduate(token, creds, user.id);
            } catch (error) {
                console.log(error);
            }
        } else if (role === "ROLE_ACADEMICIAN") {

            try {
                await updateAcademician(token, creds, user.id);
            } catch (error) {
                console.log(error);
            }

        }

        console.log(getAllUsers(token));
    }

    return (
        <div  className="list-group-item list-group-item-action">
            <div className="d-flex justify-content-between">
                <div>
                    <img className="rounded-circle" width="32" height="32" alt={`${user.username} profile`} src={profilePic} />
                    <span className="pl-2"> {`${user.name} ${user.surname} ${type}`}</span>
                </div>
                <div>
                    <button className="btn btn-success" onClick={onClickSend} > Send </button>
                </div>

            </div>

        </div>
    );
};

export default NotApprovedUserListItem;