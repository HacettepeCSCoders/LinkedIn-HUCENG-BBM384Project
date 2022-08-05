import React, {useEffect, useState} from "react";
import "../designs/ProfilePage.css"
import {useSelector} from "react-redux";
import {getAcademician, getGraduate, getStudent} from "../api/apiCalls";
import ProfileCard from "../components/Profile/ProfileCard";
import {useParams} from "react-router";


const ProfilePage = (props) =>{

        const [user,setUser] = useState({});
        const [notFound,setNotFound] = useState(false);


        const {username: loggedInUsername ,role,token} = useSelector(store=> ({
            username: store.username,
            role: store.role[0],
            token: store.token,
        }));

        const routeParams = useParams();
        const pathUsername = routeParams.username;

        useEffect(() => {
            setNotFound(false);
        } ,[user]);

        useEffect(() => {
            const loadUser = async () => {
                let response
                try {
                    response = await getStudent(token,props.match.params.username);
                    setUser(response.data);
                    setUser({...response.data,role:"ROLE_STUDENT"})
                    console.log(user);
                    return;
                } catch (error) {
/*                    setNotFound(true);
                    console.log(error);
                    console.log(notFound);*/

                }
                try {
                    response = await getAcademician(token,props.match.params.username);
                    setUser(response.data);
                    setUser({...response.data,role:"ROLE_ACADEMICIAN"})
                    return;
                } catch (error) {
/*                    setNotFound(true);
                    console.log(error);
                    console.log(notFound);*/

                }
                try {
                    response = await getGraduate(token,props.match.params.username);
                    setUser(response.data);
                    setUser({...response.data,role:"ROLE_GRADUATE"})
                    console.log(response.data);
                    return;
                } catch (error) {

/*                    setNotFound(true);
                    console.log(error);
                    console.log(notFound);*/

                }
                setNotFound(true);
                console.log(notFound);
                console.log(response.data);
            }
            loadUser();
        }, [props.match.params.username])

        if(notFound || user.is_approved === false){
            return(<div className="alert alert-danger"> User not found </div>)
        }
        return(
            <div>
                <ProfileCard user={user}/>

            </div>
        );



}



export default ProfilePage;