import React, {Component} from 'react';
import {getAllAcademicians, getAllGraduates, getAllStudents} from "../../api/apiCalls";
import {connect} from "react-redux";
import {logoutSuccess} from "../../redux/AuthActions";
import UserListItem from "./UserListItem";
import NotApprovedUserListItem from "./NotApprovedUserListItem";
import {getAllUsers} from "./GetAllUsers";


class UserList extends Component {

    state = {
        users:[]
    };

    async componentDidMount() {

        const {token} = this.props;
        await getAllStudents(token).then(response => {
            const userCopy = [...response.data];
            userCopy.forEach((element) => {
                element.role = "ROLE_STUDENT";
            })
            this.setState({
                users: userCopy,
            })
        }).catch(error => {
            console.log(error);
        })

        await getAllAcademicians(token).then(response => {
            const userCopy = [...response.data];
            userCopy.forEach((element,key = element.id) => {
                element.role = "ROLE_ACADEMICIAN";
            })

            this.setState({
                users: this.state.users.concat(userCopy),
            })
        }).catch(error => {
            console.log(error);
        })

        await getAllGraduates(token).then(response => {
            const userCopy = [...response.data];
            userCopy.forEach((element) => {
                element.role = "ROLE_GRADUATE";
            })
            this.setState({
                users: this.state.users.concat(userCopy),
            })
        }).catch(error => {
            console.log(error);
        })

        /*const userLar = getAllUsers(token);
        console.log(userLar);*/


    }

    render() {
        const {users} = this.state;
        const {cond, condRequestUserDetails, home} = this.props;
        return (
            <div>
                <div className="card">
                    { cond && !condRequestUserDetails && !home && <h3 className="card-header text-center">Users</h3>}
                    {users.map((user)=> (
                        <div>
                            {user.is_approved === true && cond &&
                            <UserListItem key={user.id} user={user}/>
                            }
                        </div>

                    ))}
                    {!cond && !condRequestUserDetails &&
                    <h3 className="card-header text-center" > Request Login</h3>}
                    {users.map((user)=> (
                        <div>
                            {user.is_approved === false  && !cond && !condRequestUserDetails &&
                            <NotApprovedUserListItem key={user.id} user={user}/>
                            }
                        </div>

                    ))}
                    {condRequestUserDetails && <div>
                        <h3 className="card-header text-center" > Request User Details</h3>
                        {users.map((user)=> (
                            <div>
                                {user.is_approved === true  && user.is_RequestUserDetails &&
                                <NotApprovedUserListItem key={user.id} user={user}/>
                                }
                            </div>

                        ))}
                    </div>}

                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        token: store.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogoutSuccess: () =>{
            return dispatch(logoutSuccess());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserList);