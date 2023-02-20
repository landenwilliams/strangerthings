import React, {useState, useEffect} from "react";
import { Navigate} from 'react-router-dom';

const Profile = (props) => {

    const [ profile, setProfile ] = useState([]);
    const [ profileLoaded, setProfileLoaded] = useState (false);
    const token = window.localStorage.getItem('token');

   
    // console.log(token);

    useEffect (() => {

        
        

        const fetchProfile = async() => {


            fetch('https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am/users/me', {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        }).then(response => response.json())
        .then(result => {
            // console.log(result.data);
            setProfile(result.data);
            setProfileLoaded(true);
            // console.log(profile);
        })
        .catch(console.error);

    }
    fetchProfile();
}, [])

const deletePost = (post, index) => {
    // console.log(post._id);
    fetch(`https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am/posts/${post._id}`, {
    method: "DELETE",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    }).then(response => response.json())
    .then(result => {
    console.log(result);
    })
    .catch(console.error);

}


    console.log(profile);
    console.log(profile.posts);
    return (
        
        <div id="posts">
            { props.isLoggedIn ? <>
                
                { profileLoaded ? <> <h1>Username: {profile.username}</h1><br/><h2>Posts: </h2>
                    { profile.posts.map((post, index) => {
                        
                      
                        return (
                            
                            <React.Fragment key={index} > 
                                { post.active ? <>
                                <div id="post" >
                                    <h1>Title: {post.title}</h1>
                                    <h2>Price: {post.price}</h2>
                                    <h3>Description:{post.description}</h3>
                                    <h4>Location:{post.location}</h4>
                                    <h5>Will Deliver: { post.willDeliver ? <>Yes</> : <>No</> } </h5>
                                    <h5>Posted: {post.createdAt}</h5>
                                    <button>Edit</button><button onClick={()=>deletePost(post, index)}>Delete</button>
                                </div><br/></>
                                 : null } 
                            </React.Fragment>
                            
                        )
                        
                    }) } 
                    <h2>Messages: </h2>
                    { profile.messages.map((post, index) => {     
                      
                        return (
                            <React.Fragment key={index} > 
                                <div id="post" >
                                    <h1>From: {post.fromUser.username}</h1>
                                    <h2>Post: {post.post.title}</h2>
                                    <h3>Message: {post.content}</h3>
                                    <button>Reply</button><button>Delete</button>
                                </div><br/>
                            </React.Fragment>
                        )
                        
                    }) } 

                    </> : <h1>profile loading..</h1>}
        </> : <Navigate to="/" /> }        
        </div>)
}



export default Profile;