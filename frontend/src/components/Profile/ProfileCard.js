import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import profilePic from "../../assets/profilePicProfilePage.webp";
import {
    deleteAcademician,
    deleteGraduate,
    deleteStudent,
    updateAcademician,
    updateGraduate,
    updateStudent
} from "../../api/apiCalls";
import ProfilePostList from "./ProfilePostList";

const ProfileCard = (props) => {
    const {username: loggedInUsername ,role: loggedInRole ,token} = useSelector(store=> ({
        username: store.username ,
        role: store.role[0],
        token: store.token,
    }));
    const routeParams = useParams();
    const {user} = props;
    const {username,id,name,surname,date_of_birth,role} = user;

    const [updatedUsername , setUpdatedUsername] = useState();
    const [updatedName , setUpdatedName] = useState();
    const [updatedSurname , setUpdatedSurname] = useState();
    const [updatedPassword , setUpdatedPassword] = useState();
    const [updatedBan , setUpdatedBan] = useState();
    const [updatedStudentRepresentative, setUpdatedStudentRepresentative] = useState();
    const [updatedRequestUserDetails, setUpdatedRequestUserDetails] = useState();


    let type = "";
    let student_number = "";
    let company = "";

    if(role === "ROLE_STUDENT"){
        type = user.type;
        student_number = user.student_number;
    } else if(role === "ROLE_GRADUATE"){
        company = user.company_name;
    } else {
        type = user.type;
    }

    const pathUsername = routeParams.username;
    let permission = "no";
    if (pathUsername === loggedInUsername){
        permission = "yes";
    }

    const onclickDelete = async () => {
        if (role === "ROLE_STUDENT") {
            try {
                await deleteStudent(token, id);
            } catch (error) {
                console.log(error);
            }
        } else if(role === "ROLE_GRADUATE") {
            try {
                await deleteGraduate(token, id);
            } catch (error) {
                console.log(error);
            }
        } else if (role === "ROLE_ACADEMICIAN")  {
            try {
                await deleteAcademician(token, id);
            } catch (error) {
                console.log(error);
            }

        }
    }

    const onClickUpdateAdmin = async () => {

        if (role === "ROLE_STUDENT") {
            const creds = {
                is_banned: updatedBan,
                is_student_representative: updatedStudentRepresentative,
            }
            try {
                await updateStudent(token, creds, id);
            } catch (error) {
                console.log(error);
            }
        } else if(role === "ROLE_GRADUATE") {
            const creds = {
                is_banned: updatedBan,
                is_student_representative: updatedStudentRepresentative,
            }
            try {
                await updateGraduate(token, creds,id);
            } catch (error) {
                console.log(error);
            }
        } else if (role === "ROLE_ACADEMICIAN")  {
            const creds = {
                is_banned: updatedBan,
                is_student_representative: updatedStudentRepresentative,
            }
            try {
                await updateAcademician(token,creds,id);
            } catch (error) {
                console.log(error);
            }

        }
    };

    const onClickUpdate = async () => {
        const creds = {
            surname: updatedSurname,
            is_approved: true,


        }
        if (role === "ROLE_STUDENT") {

            try {
                await updateStudent(token, creds, id);
            } catch (error) {
                console.log(error);
            }
        } else if(role === "ROLE_GRADUATE") {

            try {
                await updateGraduate(token, creds,id);
            } catch (error) {
                console.log(error);
            }
        } else if (role === "ROLE_ACADEMICIAN")  {
            try {
                await updateAcademician(token,creds,id);
            } catch (error) {
                console.log(error);
            }

        }
    }


    const modalUpdateUser = (<div>
            <div className="modal fade" id="modalCardUpdate" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Create Job/Internship/Scholarship Announcement</h5>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-row">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
                                    <input className="form-control"  defaultValue={username}
                                              onChange={(event) =>
                                                  setUpdatedUsername(event.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                                    <input className="form-control"  defaultValue={name}
                                           onChange={(event) =>
                                               setUpdatedName(event.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Surname</label>
                                    <input className="form-control"  defaultValue={surname}
                                           onChange={(event) =>
                                               setUpdatedSurname(event.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                                    <input className="form-control"
                                              onChange={(event) =>
                                                  setUpdatedPassword(event.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Request User Details</label>
                                    <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref"
                                            onChange={(event => {
                                                setUpdatedRequestUserDetails(event.target.value);
                                            })}>
                                        <option value={true}>Request</option>

                                    </select>
                                </div>

                            </div>
                        </form>
                        <div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button
                            type="button" className="btn btn-primary"
                            onClick={onClickUpdate}
                            /*disabled={!buttonEnabled}*/>
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
    )

    const modalUpdateAdmin = (<div>
        <div className="modal fade" id="modalCardUpdateAdmin" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Update Account {user.name}</h5>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Preference</label>
                                <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref"
                                        onChange={(event => {
                                            setUpdatedBan(event.target.value);
                                        })}>
                                    <option value={false}>Unban</option>
                                    <option value={true}>Ban</option>
                                </select>
                            </div>
                            {user.role === "ROLE_STUDENT" &&
                            <div>
                                <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">IsStudentRepresentive</label>
                                    <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref"
                                            onChange={(event => {
                                                setUpdatedStudentRepresentative(event.target.value);
                                            })}>
                                    <option value={false}>Yes</option>
                                    <option value={true}>No</option>
                                    </select>
                            </div>
                            }
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button
                            type="button" className="btn btn-primary"
                            onClick={onClickUpdateAdmin}>
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>)

    return (
        <div style={{backgroundColor:"black"}}>
            <link rel="stylesheet" href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            <div className="container bootstrap snippets bootdey">
                <div className="row">
                    <div className="col-md-12">
                        <div className="grid profile">
                            <div className="grid-header">
                                {/* Profile Header part*/}
                                <div className="col-xs-2">
                                    <img src={profilePic}
                                         className="img-circle" alt=""/>
                                </div>
                                <div className="col-xs-7">
                                    <h3 className="text-center">{name} {surname}</h3>
                                </div>
                                <div>
                                    {loggedInRole ==="ROLE_ADMIN" &&
                                    <div className= "text-right">
                                        <button type="button" className="btn btn-success" data-toggle="modal"
                                                data-target="#modalCardUpdateAdmin" data-whatever="@mdo">
                                            <span className="material-symbols-outlined"> edit</span>Update
                                        </button>
                                        <button className="btn btn-danger" onClick={onclickDelete}>
                                            <span className="material-symbols-outlined">delete_forever </span> Delete
                                        </button>
                                        <button className="btn btn-warning">
                                            Merge Mail
                                        </button>
                                    </div> }
                                    {pathUsername === loggedInUsername &&
                                    <div>
                                        <button type="button" className="btn btn-success" data-toggle="modal"
                                                data-target="#modalCardUpdate" data-whatever="@mdo">
                                            <span className="material-symbols-outlined"> edit</span>Update
                                        </button>
                                    </div> }
                                </div>
                            </div>
                            <div className="grid-body">
                                <ul className="nav nav-tabs">
                                    <li className="active"><a href="#profile" data-toggle="tab">Profile</a></li>
                                    <li className=""><a href="#timeline" data-toggle="tab">Timeline</a></li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane active" id="profile">
                                        <div className="row">
                                            <h3><strong>About</strong></h3>
                                            <div className="col-md-6">
                                                <p><strong>Email:</strong> <a href="mailto:jwilliams@gmail.com">{username}</a></p>
                                                <p><strong>Date of Birth:</strong> {date_of_birth}</p>
                                                <p><strong>Statu:</strong> {role}</p>
                                                {role === "ROLE_STUDENT" &&
                                                <div>
                                                    <p><strong>Student Degree:</strong> {type}</p>
                                                    <p><strong>Student Number:</strong> {student_number}</p>
                                                </div>}
                                                {role === "ROLE_ACADEMICIAN" &&
                                                <div>
                                                    <p><strong>Academician Degree:</strong> {type}</p>
                                                </div>}
                                                {role === "ROLE_GRADUATE" &&
                                                <div>
                                                    <p><strong>Worked Here:</strong> {company}</p>
                                                </div>}
                                                <p><strong>Joined on:</strong> {permission}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane active" id="timeline">
                                        <div className="row">
                                            <h3><strong>Timeline</strong></h3>
                                            <div className="col-md-6">
                                                <ProfilePostList user = {user}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {modalUpdateUser} {/*MODAL PART*/}
                {modalUpdateAdmin}
            </div>
        </div>

        );
}

export default ProfileCard;