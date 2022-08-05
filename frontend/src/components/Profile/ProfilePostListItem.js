import React, {useEffect, useState} from 'react';
import profilePic from "../../assets/profilePicProfilePage.webp";
import {
    deleteAnnouncement,
    deleteMeeting, deletePost,
    getAcademician,
    getAcademicianById,
    getAllJobs,
    getGraduate, getGraduateById,
    getMeetingByPublisherId,
    getStudent, getStudentById
} from "../../api/apiCalls";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {format} from "timeago.js";

const PostListItem = (props) => {
    const {post} = props;
    const [publisher, setPublisher] = useState();

    const {username:onLoggedUsername,id,token,role} = useSelector(store => ({
        username: store.username,
        id: store.id,
        token: store.token,
        role:store.role[0],
    }));

    let formatted  = format(post.created);

    const onClickDelete = async () => {
        console.log("DELETE")
        if (post.role === "MEETING") {
            try {
                await deleteMeeting(token, post.id);
            } catch (error) {
                console.log(error);
            }
        } else if (post.role === "ANNOUNCEMENT") {
            try {
                await deleteAnnouncement(token,post.id);
            } catch (error) {

            }

        } else if (post.role === "POST") {
            try {
                await deletePost(token,post.id);
            } catch (error) {

            }

        }
    }

    return (
        <div>
            <div className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="row">
                    <div className="col-1">
                        <img className="rounded-circle ml" width="32" height="32"  src={profilePic} alt="Generic placeholder image"/>
                    </div>
                    <div class="col-10">
                        <div className="d-flex justify-content-between">
                            {publisher && publisher.username && <Link to={`/user/${publisher.username}`} className="">
                                {publisher.name&& publisher.surname &&
                                <p> {publisher.name} {publisher.surname}</p>}
                            </Link>}
                            <div className="d-flex justify-content-end">
                                <h6 className="d-flex justify-content-end"> {formatted}</h6>
                                { role === "ROLE_ADMIN" &&
                                <div className="dropdown">
                                    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                            onClick={onClickDelete} >
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <button className="dropdown-item" onClick={onClickDelete}>DELETE</button>
                                    </div>
                                </div>}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="media-body">
                    <div> {post.content}</div>
                    <a href={post.link}> {post.link}</a>
                    <p> {post.meetingTime}</p>
                    <p> {post.role}</p>
                </div>

            </div>
            <br/>
        </div>
    );
};

export default PostListItem;