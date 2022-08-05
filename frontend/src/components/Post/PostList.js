import {connect} from "react-redux";
import {getAllAnnouncements, getAllMeetings, getAllPosts, getPhoto} from "../../api/apiCalls";
import React, {Component} from 'react';
import {logoutSuccess} from "../../redux/AuthActions";
import PostListItem from "./PostListItem";

class PostList extends Component {

    state = {
        posts:[],
        image: undefined
    };

    async componentDidMount() {
        const {token} = this.props;
        try {
            const response = await getAllPosts(token);
            const postCopy = [...response.data];
            postCopy.forEach((element, key = element.id) => {
                element.role = "POST";
            })

            this.setState({
                posts: postCopy,
            })
        } catch (error) {
            console.log(error);
        }

        try {
            const response = await getAllAnnouncements(token);
            const postCopy = [...response.data];
            postCopy.forEach((element, key = element.id) => {
                element.role = "ANNOUNCEMENT";
            })
            this.setState({
                posts: this.state.posts.concat(postCopy),
            })
        } catch (error) {
            console.log(error);
        }

        try {
            const response = await getAllMeetings(token);
            const postCopy = [...response.data];
            postCopy.forEach((element, key = element.id) => {
                element.role = "MEETING";
            })
            this.setState({
                posts: this.state.posts.concat(postCopy),
            })
        } catch (error) {
            console.log(error);
        }

      /*  this.state.posts.sort(function(a, b) {
            var keyA = new Date(a.created),
                keyB = new Date(b.created);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });*/

   /*     try{
            const response = await getPhoto(token,"627d079435ada62265ebb6a9");
            this.setState({
                image: response.data,
            })
        }catch(error){
            console.log(error);
        }*/

    }



    render() {
        const {posts,image} = this.state;
        return (
            <div>
                <ul className="list-group">
                    {posts.map(post=> {

                          return  <PostListItem key={post.id} post={post}/>
                    })}
                </ul>
                <div>
                    {image}
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

export default connect(mapStateToProps,mapDispatchToProps)(PostList);