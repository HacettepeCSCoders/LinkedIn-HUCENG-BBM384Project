import React, { useState } from 'react';
import profilePic from "../../assets/profilePic.png"
import PostType from "./PostType";
import {useSelector} from "react-redux";

const SharePost = () => {

    const [shareType, setShareType] = useState("Post");

    const {username:onLoggedUsername,id,token,role} = useSelector(store => ({
        username: store.username,
        id: store.id,
        token: store.token,
        role:store.role[0],
    }));

    return (
        <div className="card">
            <div className="card-header row">
                <div className="col-1">
                    <img className="card-img-top rounded-circle" width="32" height="32" alt="" src={profilePic} />
                </div>
                <div className="col-6">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        {role !== "ROLE_STUDENT" &&
                        <button type="button" className="btn btn-secondary"
                            onClick={(event) =>
                                setShareType("Event")}>Announcement</button>}
                        {role !== "ROLE_STUDENT" &&
                        <button type="button" className="btn btn-secondary"
                            onClick={(event) =>
                                setShareType("Meeting")}>Meeting</button>}
                        <button type="button" className="btn btn-secondary"
                            onClick={(event) =>
                                setShareType("Post")}>Post</button>
                    </div>

                </div>
            </div>
            <div className="card-body">
                <PostType shareType={shareType} />

            </div>

        </div>
    );
};

export default SharePost;