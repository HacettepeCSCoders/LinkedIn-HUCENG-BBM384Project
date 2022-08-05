import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {deleteJob, getJob, postJobApply, updateJob} from "../../api/apiCalls";

const JobListItem = (props) => {
    const {job} = props;
    const [show,setShow] = useState(false);

    const {username:onLoggedUsername,id,token,role} = useSelector(store => ({
        username: store.username,
        id: store.id,
        token: store.token,
        role:store.role[0],
    }));

    const [username,setUsername] = useState(onLoggedUsername);
    const [phone,setPhone] = useState();
    const [resume,setResume] = useState();
    const [certificates,setCertificates] = useState();
    const [menuShow,setMenuShow] = useState();

    const onClickJob = () => {
        setShow(!show);
    }
    const onChangeResume = (e) => {

        setResume(e.target.files[0]);
        /*let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        console.log(files);
        console.log(reader);

        reader.onload = (e) => {
            console.warn("img data" ,e.target.result);
            setResume(e.target.result);*/

    }

    const onChangeCertificate = (e) => {
        setCertificates(e.target.files);

    }

    const onClickApply = async () => {
        console.log(job.companyName);
        const creds = {
            companyName: job.companyName,
            jobTitle: job.jobTitle,
            aboutJob: job.aboutJob,
            jobLocation: job.jobLocation,
            jobType: job.jobType,
            id : job.id,
        }
        try {
            console.log("yes")
            await postJobApply(token,"84safas",job.id);
       /*     await updateJob(token,creds,job.id);*/
   /*         await deleteJob(token,job.id);*/
    /*        const response = await getJob(token,job.id);*/
        } catch (error) {
            console.log(error);
        }

    }

    const onClickDelete = async () => {
        try {
            console.log("delete")
            await deleteJob(token, job.id);
        } catch (error) {
            console.log(error);
        }
    }

    const onClickUpdate = async () => {
        try {
            console.log("update")
            await deleteJob(token, job.id);
        } catch (error) {
            console.log(error);
        }
    }


    const buttonEnabled = username && phone/* && resume && certificates*/;

    return (
        <div className="container">
            <link rel="stylesheet" href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,500,0,0" />            <div className="row">
            <div className="col-3">
            <a  className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h4 className="mb-1">{job.jobTitle}</h4>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">DELETE</a>
                    </div>
                    {role === "ROLE_ADMIN" &&
                    <button className="btn btn-light" onClick={onClickDelete}>
                        <span className="material-symbols-outlined">delete_forever </span>
                    </button> }
                    {role === "ROLE_ADMIN" &&
                    <button className="btn btn-light" onClick={onClickUpdate}>
                        <span className="material-symbols-outlined"> update </span>
                    </button> }
                </div>
                <div onClick={onClickJob}>
                <p className="mb-1">{job.companyName}</p>
                <small className="text-muted"> {job.jobLocation},</small>
                <small className="text-muted"> {job.jobType}</small>
                <br/>

                </div>
            </a>
            </div>
            {show && <div className="col-sm">
                <div className="list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h4 className="mb-1">{job.jobTitle}</h4>
                        <button className="btn btn-primary" data-toggle="modal" data-target={`#${job.id}`}>
                            <i class="fa fa-external-link"/> Apply </button>

                    </div>
                    <p className="mb-1">{job.companyName}</p>
                    <small className="text-muted"> {job.jobLocation},</small>
                    <small className="text-muted"> {job.jobType}</small>
                    <p className="mb-1">{job.aboutJob}</p>
                </div>
            </div>}
            </div>
            <div className="modal fade" id={job.id} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{job.jobTitle} Apply in {job.companyName}</h5>
                        </div>
                        <div className="modal-body">
                            <form>
                                <h3> Account Information</h3>
                                <div className="form-row">
                                    <div className="col-10">
                                        <label >E-Mail</label>
                                        <input type="text" className="form-control"
                                               placeholder="E-mail Address" defaultValue={onLoggedUsername}
                                               onChange={(event) => setUsername(event.target.value)} />
                                    </div>
                                    <br/>
                                    <div className="col-10">
                                        <label >Phone Number</label>
                                        <input type="text" className="form-control"
                                               placeholder="Phone Number"
                                               onChange={(event) => setPhone(event.target.value)}/>
                                    </div>
                                    <br/>
                                    <div className="mb-3">
                                        <label htmlFor="formFile" className="form-label">Resume</label>
                                        <input className="form-control" type="file" id="formFile" accept= ".png,.jpeg,.pdf"
                                        onChange={(e) => onChangeResume(e)}
                                        />
                                    </div>
                                    <br/>
                                    <div className="mb-3">
                                        <label htmlFor="formFile" className="form-label">Certificates</label>
                                        <input className="form-control" type="file" id="formFile" accept= ".png,.jpeg,.pdf" multiple
                                               onChange={(e) => onChangeCertificate(e)}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" disabled={!buttonEnabled} onClick={onClickApply}>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default JobListItem;