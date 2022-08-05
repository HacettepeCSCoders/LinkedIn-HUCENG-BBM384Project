import React, {Component} from 'react';
import {logoutSuccess} from "../../redux/AuthActions";
import {connect} from "react-redux";
import {getAnnouncementByPublisherId, getMeetingByPublisherId, getPostByPublisherId} from "../../api/apiCalls";
import ProfilePostListItem from "./ProfilePostListItem";

class ProfilePostList extends Component {

    state = {
        posts: [],
    }

    async componentDidMount(){
        const {token,user} = this.props;

        try {
            const userId = user.id
            const response = await getMeetingByPublisherId(token,userId);
            this.setState({
               posts: response.data,
            });

        } catch (error) {
            console.log(error);
        }

        try {
            const userId = user.id
            const response = await getAnnouncementByPublisherId(token,userId);
            this.setState({
                posts: this.state.posts.concat(response.data),
            });

        }catch (error) {
            console.log(error);
        }

        try {
            const userId = user.id
            const response = await getPostByPublisherId(token,userId);
            this.setState({
                posts: this.state.posts.concat(response.data),
            });

        }catch (error) {
            console.log(error);
        }
    }

    onClickButton= () =>  {
        this.setState({
            try: false,
        })
    }

    render() {
        const {posts} = this.state;
        const {user} = this.props;
        return (
            <div>
                <div> "" </div>
                <button onClick={this.onClickButton}/>
                {user &&
                <ul className="list-group">
                    {posts.map(post=> {

                        return  <ProfilePostListItem key={post.id} post={post} user={user}/>
                    })}
                </ul> }
                <div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        token: store.token,
        id :store.id,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogoutSuccess: () =>{
            return dispatch(logoutSuccess());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePostList);