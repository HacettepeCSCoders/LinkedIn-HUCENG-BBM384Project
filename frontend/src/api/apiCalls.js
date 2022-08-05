import axios from "axios";

export const signup = body =>{
    return axios.post('http://localhost:8080/api/v1/registration',body);
}

export const login = creds => {
    const params = new URLSearchParams(creds)
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    return axios.post('http://localhost:8080/api/login', params, config );
}

export const setAuthorizationHeader = ({isLoggedIn , token}) => {
    if (isLoggedIn){
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    }else{
        delete axios.defaults.headers["Authorization"];
    }

}

// USERS GETALL
export const getAllStudents = (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.get('http://localhost:8080/api/v1/students/getAllStudents',config);
}

export const getAllAcademicians = (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.get('http://localhost:8080/api/v1/academicians/getAllAcademicians',config);
}

export const getAllGraduates = (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.get('http://localhost:8080/api/v1/graduates/getAllGraduates',config);
}

// STUDENT GET,DELETE,UPDATE
export const getStudent = (token,username) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.get(`http://localhost:8080/api/v1/students/getByUsername/${username}`, config);
}

export const getStudentById = (token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.get(`http://localhost:8080/api/v1/students/${id}`, config);

}

export const deleteStudent = (token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.delete(`http://localhost:8080/api/v1/students/${id}`,config);
}

export const updateStudent = (token,creds,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.put(`http://localhost:8080/api/v1/students/${id}`,creds,config);

}

// ACADEMICIAN GET,DELETE,UPDATE
export const getAcademician = (token,username) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.get(`http://localhost:8080/api/v1/academicians/getByUsername/${username}`, config);
}

export const getAcademicianById = (token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.get(`http://localhost:8080/api/v1/academicians/${id}`, config);
}



export const deleteAcademician = (token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.delete(`http://localhost:8080/api/v1/academicians/${id}`,config);
}

export const updateAcademician = (token,creds,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.put(`http://localhost:8080/api/v1/academicians/${id}`,creds,config);

}

// GRADUATE GET,DELETE,UPDATE
export const getGraduate = (token,username) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.get(`http://localhost:8080/api/v1/graduates/getByUsername/${username}`, config);
}

export const getGraduateById = (token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.get(`http://localhost:8080/api/v1/graduates/${id}`, config);
}

export const deleteGraduate = (token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.delete(`http://localhost:8080/api/v1/graduates/${id}`, config);
}

export const updateGraduate = (token,creds,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.put(`http://localhost:8080/api/v1/academicians/${id}`,creds,config);

}

// JOB  POST , GETALL , UPDATE , DELETE , GET
export const postJob = (token,creds) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.post('http://localhost:8080/api/v1/jobOffers', creds,config);
}

export const getAllJobs = (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.get('http://localhost:8080/api/v1/jobOffers', config);
}

export const updateJob = (token,creds,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.post(`http://localhost:8080/api/v1/jobOffers/updateJobOffer/${id}`,creds, config)
}

export const deleteJob = (token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    return axios.delete(`http://localhost:8080/api/v1/jobOffers/deleteJobOffer/${id}`, config);

}

export const getJob = (token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    return axios.get(`http://localhost:8080/api/v1/jobOffers/${id}`, config);

}

// JOBAPPLY POST
export const postJobApply = (token,creds,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.put(`http://localhost:8080/api/v1/jobOffers/addAppliedUser/${id}`, creds, config) // yanlış api
}

// MEETING POST, GETALL
export const postMeeting = (token,creds) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.post('http://localhost:8080/api/v1/meetings', creds,config);
}

export const getAllMeetings = (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.get('http://localhost:8080/api/v1/meetings',config)

}

export const getMeetingByPublisherId = (token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    return axios.get(`http://localhost:8080/api/v1/meetings/getByPublisherId/${id}`,config);
}

export const deleteMeeting = (token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.delete(`http://localhost:8080/api/v1/meetings/deleteMeeting/${id}`,config);

}

// ANNOUNCEMENTS POST, GETALL
export const postAnnouncement = (token,creds) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    return axios.post('http://localhost:8080/api/v1/announcements', creds,config);
}

export const getAllAnnouncements = (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.get('http://localhost:8080/api/v1/announcements',config)

}

export const deleteAnnouncement = (token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    return axios.delete(`http://localhost:8080/api/v1/announcements/${id}`,config);

}

export const getAnnouncementByPublisherId = (token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    return axios.get(`http://localhost:8080/api/v1/announcements/getByPublisher/${id}`,config);
}

// SHARE POST, GETALL

export const postShare = (token,creds) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    return axios.post('http://localhost:8080/api/v1/posts', creds,config);
}

export const getAllPosts = (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    console.log(token);

    return axios.get('http://localhost:8080/api/v1/posts',config);
}

export const deletePost = (token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    console.log(token);

    return axios.delete(`http://localhost:8080/api/v1/posts/${id}`,config);

}

export const getPostByPublisherId = (token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    return axios.get(`http://localhost:8080/api/v1/posts/getByPublisher/${id}`,config);
}

export const getPhoto = (token,id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    console.log(token);

    return axios.get(`http://localhost:8080/api/v1/photos/${id}`,config);
}

export const postPhoto = (token,creds) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type' : 'multipart/form-data'
        }
    }
    console.log(token);

    return axios.post("http://localhost:8080/api/v1/photos/add",creds,config);
}


