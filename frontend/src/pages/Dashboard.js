import React, {useState} from "react";
import UserList from "../components/UserList/UserList";
import {connect, useSelector} from "react-redux";
import {logoutSuccess} from "../redux/AuthActions";


const Dashboard = (props) => {
    const {username ,role,token} = useSelector(store=> ({
        username: store.username ,
        role: store.role[0],
        token: store.token,
    }));
    const [cond,setCond] = useState();
    const [condRequestUserDetails,setCondRequestUserDetails] = useState();
    return (
        <div>
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <UserList cond = {true} condRequestUserDetails = {false}/>
                </div>
                <div className="col-sm">
                    <UserList cond = {false} condRequestUserDetails = {false}/>
                </div>

            </div>
            <div className="row">
                <div className="col-sm">
                    <UserList condRequestUserDetails = {true} cond = {undefined}/>
                </div>
                <div className="col-sm">

                </div>

            </div>
        </div>
    </div>
    );

}



export default Dashboard;
