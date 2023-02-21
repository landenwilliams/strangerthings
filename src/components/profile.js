import React, {useState, useEffect} from "react";
import { Navigate} from 'react-router-dom';

const Profile = (props) => {

    const [ profile, setProfile ] = useState([]);
    const [ profileLoaded, setProfileLoaded] = useState (false);
    const [ editPostDisplay, setEditPostDisplay ] = useState(false);
    const [ postTitle, setPostTitle] = useState('');
    const [ postDescript, setPostDescript ] = useState('');
    const [ postPrice, setPostPrice ] = useState('');
    const [ postLocation, setPostLocation ] = useState('');
    const [ currentPost, setCurrentPost ] = useState({});
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
    // console.log(result);
    window.location.reload();
    })
    .catch(console.error);   

}


    const editPost = (post, index) => {
    fetch(`https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am/posts/${post._id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
        post: {
            title: `${postTitle}`,
            description: `${postDescript}`,
            price: `${postPrice}`,
            location: `${postLocation}`,
            willDeliver: true
        }
        })
    }).then(response => response.json())
    .then(result => {
    // console.log(result);
    window.location.reload();
    })
    .catch(console.error);

    }
const editOnClick = (post) => {
    setCurrentPost (post);
    setEditPostDisplay(true);
}


    // console.log(profile);
    // console.log(profile.posts);
    return (
        
        <div id="posts">
            { props.isLoggedIn ? <>
                
                { profileLoaded ? <> <h1>Username: {profile.username}</h1><br/><h2>Posts: </h2>
                    { profile.posts.map((post, index) => { 
                        // () => {setPostTitle(post.title)}
                        return (
                            
                            <React.Fragment key={index} >         

                                { post.active ? <>
                                    { editPostDisplay ? 
                                        <div className="popupbox">
                                            <div id="editDiv"><h1>Edit Post:</h1>
                                                <input placeholder="Title" defaultValue={currentPost.title} onChange={() => {setPostTitle(event.target.value)}}/><br/>
                                                <input placeholder="Description" defaultValue={currentPost.description} onChange={() =>{setPostDescript(event.target.value)}}/><br/>
                                                <input placeholder="Price" type="number" defaultValue={currentPost.price} onChange={() => {setPostPrice(event.target.value)}}/><br/>
                                                <input placeholder="Location" defaultValue={currentPost.location} onChange={() => {setPostLocation(event.target.value)}}/><br/>
                                                
                                                <button className="postbuttons" onClick={() => editPost(currentPost)}>Submit Edit</button>
                                                <button className="postbuttons" onClick={() => setEditPostDisplay(false)}>Cancel</button>
                                                
                                            </div>
                                        </div>  : null } 
                                        <div id="post" >
                                            <h1>Title: {post.title}</h1>
                                            <h2>Price: {post.price}</h2>
                                            <h3>Description:{post.description}</h3>
                                            <h4>Location:{post.location}</h4>
                                            <h5>Will Deliver: { post.willDeliver ? <>Yes</> : <>No</> } </h5>
                                            
                                            <div id="profilebuttons">
                                                <button onClick={()=>editOnClick(post)}>Edit</button>
                                                <button onClick={()=>deletePost(post, index)}>Delete</button>
                                            </div>
                                            <h5>Posted: {post.createdAt}</h5>
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
                                    <button>Reply</button>
                                </div><br/>
                            </React.Fragment>
                        )
                        
                    }) } 

                    </> : <h1>profile loading..</h1>}
        </> : <Navigate to="/" /> }        
        </div>)
}

export default Profile;