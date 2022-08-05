import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {postJob} from "../../api/apiCalls";

const ShareJobAnnouncement = (props) =>{
        const[submit,setSubmit] = useState(false);

        const[postCompanyName,setPostCompanyName] = useState("");
        const[postJobTitle,setPostJobTitle] = useState("");
        const[postAboutJob,setPostAboutJob] = useState("");
        const[postJobLocation,setPostJobLocation] = useState("");
        const[postJobType,setPostJobType] = useState("");

        const[success,setSuccess] = useState(false);

    const {username,id,token} = useSelector(store => ({
        username:store.username,
        id: store.id,
        token: store.token,
    }))

 /*       const onClickCreateJob = () => {
            setSubmit(!submit);
        }*/
       /* const onClickClose = () => {
            setSubmit(false);
            setPostAboutJob("");
            setPostJobTitle("");
            setPostCompanyName("");
            setPostJobLocation("");
            setPostJobType("");
        }*/
        const onClickSubmit = async () => {
            const creds = {
                username: username,
                companyName: postCompanyName,
                jobTitle: postJobTitle,
                aboutJob: postAboutJob,
                jobLocation: postJobLocation,
                jobType: postJobType,
            }
            try {
                await postJob(token, creds);
            } catch (error) {
                console.log(error);
            }

            setSuccess(true);
            setPostAboutJob("");
            setPostJobTitle("");
            setPostCompanyName("");
            setPostJobLocation("");
            setPostJobType("");



            console.log("yes");



        }

        const buttonEnabled = postCompanyName && postJobTitle && postAboutJob && postJobLocation && postJobType
        let show = "";
        show = (
            <div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
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
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Company Name</label>
                                            <textarea className="form-control" placeholder="Company Name"
                                                  onChange={(event) =>
                                                      setPostCompanyName(event.target.value)}/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Job Title</label>
                                                <textarea className="form-control" placeholder="Job Title"
                                                          onChange={(event) =>
                                                              setPostJobTitle(event.target.value)}/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Job Location</label>
                                                <input className="form-control" placeholder="Job Location"
                                                       onChange={(event) =>
                                                           setPostJobLocation(event.target.value)}/>
                                        </div>
                                        <div className="mb-3">
                                        <label className="my-1 mr-2" >Job Type </label>
                                        <select className="custom-select"
                                                id="inlineFormCustomSelectPref"
                                                    onChange={(event) =>
                                                        setPostJobType(event.target.value)}>
                                            <option value="Remote"> Remote</option>
                                            <option value="Hybrid"> Hybrid</option>
                                            <option value="Office"> Office</option>
                                        </select>
                                        </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">Job Description</label>
                                                <textarea className="form-control" placeholder="About Job"
                                                          onChange={(event) =>
                                                              setPostAboutJob(event.target.value)}/>
                                            </div>
                                        </div>
                                    </form>
                                    <div>
                                        {success && <div className="alert alert-success">You have been created new announcement.</div>}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <button
                                        type="button" className="btn btn-primary"
                                        onClick={onClickSubmit}
                                        disabled={!buttonEnabled}>
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                );


        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"> Create Announcement </button>
                    </div>
                    <div className="col-9">
                        {show}
                    </div>
                </div>
            </div>
        );
}

export default ShareJobAnnouncement;