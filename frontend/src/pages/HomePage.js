import React from "react";
import UserList from "../components/UserList/UserList";
import { connect } from "react-redux";
import { logoutSuccess } from "../redux/AuthActions";
import TopBar from "../components/TopBar";
import SharePost from "../components/Post/SharePost";
import PostList from "../components/Post/PostList";
import SideBar from "../components/Post/SideBar";



class HomePage extends React.Component {
    render() {
        const { sub, role } = this.props
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <SideBar />
                    </div>
                    <div className="col-6">
                        <div>
                            <SharePost />
                        </div>
                        <div>
                            <PostList />
                        </div>
                    </div>
                    <div className="col">
                        <UserList cond={true} home={true} />
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (store) => {
    return {
        isLoggedIn: store.isLoggedIn,
        sub: store.sub,
        role: store.role,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogoutSuccess: () => {
            return dispatch(logoutSuccess());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
