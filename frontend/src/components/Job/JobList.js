import React, {useEffect, useState} from 'react';
import {getAllJobs} from '../../api/apiCalls';
import {useSelector} from "react-redux";
import JobListItem from "./JobListItem";
import jobApplication from "../../assets/jobsApplication.jpg"

const JobList = (props) => {
    const [jobPage, setJobPage] = useState([]);

    const {id,token} = useSelector(store => ({
        id: store.id,
        token: store.token,
    }));
   useEffect( () => {
       const loadJobs = async () => {
           try {
               const response = await getAllJobs(token);
               setJobPage(response.data);

           } catch (error) {
               console.log(error);
           }
       };
       loadJobs();
    }, [])


    if(jobPage.length === 0) {
        console.log(jobPage.length);
        return (<div className="alert alert-info text-center">
            <img className="img-fluid"  alt="profile" src={jobApplication} />
            <div> There is no job announcement.</div>
        </div> );
    }


    return (
        <div >
            <ul className="list-group">
            {jobPage.map(job => {
                return <JobListItem key={job.id} job = {job}/>;
            })}
            </ul>
        </div>
    );
};

export default JobList;