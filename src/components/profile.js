import React, {useState, useEffect} from "react";

const Profile = () => {

    const [ profile, setProfile ] = useState([]);
    const [ profileLoaded, setProfileLoaded] = useState (false);
    

   
    // console.log(token);

    useEffect (() => {

        const token = window.localStorage.getItem('token');
        // console.log(token);

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
    // console.log(profile);
    console.log(profile.posts);
    return (
        
        <div id="posts">
                
                { profileLoaded ? <> <h1>{profile.username}</h1>
                    { profile.posts.map((post, index) => {
                        return (
                            <React.Fragment key={index} > 
                                <div id="post" >
                                    <h1>Title: {post.title}</h1>
                                    <h2>Price: {post.price}</h2>
                                    <h3>Description:{post.description}</h3>
                                    <h4>Location:{post.location}</h4>
                                    <h5>Will Deliver: { post.willDeliver ? <>Yes</> : <>No</> } </h5>
                                    <h5>Posted: {post.createdAt}</h5>
                                </div><br/>
                            </React.Fragment>
                        )
                    }) } </> : <h1>profile loading..</h1>}
                
        </div>)
}



export default Profile;