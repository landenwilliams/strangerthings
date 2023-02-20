import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const RenderPage = (props) => {
    const [ addPostDisplay, setAddPostDisplay ] = useState (false);
    const [ addMessageDisplay, setAddMessageDisplay ] = useState(false);
    const [ searchTerm, setSearchTerm ] = useState('');

    const addPost = () => {
        fetch('https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am/posts', {
        method: "POST",
         headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U0N2Y3YjcwOWM0ODAwMTU5YmVkYzciLCJ1c2VybmFtZSI6InN1cGVybWFuMjciLCJpYXQiOjE2NzY2MjEyNTB9.-mGQ7OZvmiOoUVKMeWyFSSBwi45Do-ltnZp35YsPUKQ'
        },
        body: JSON.stringify({
        post: {
        title: "My favorite stuffed animal",
        description: "This is a pooh doll from 1973. It has been carefully taken care of since I first got it.",
        price: "$480.00",
        willDeliver: true
        }
  })
}).then(response => response.json())
  .then(result => {
    console.log(result);
  })
  .catch(console.error);
        
    }

  
    
    return (
        <>
        { addPostDisplay ? 
            <div id="addpost">
                <div>
                    <input placeholder="Title" /><br/>
                    <input placeholder="Description" /><br/>
                    <input placeholder="Price" /><br/>
                    <input placeholder="Location" /><br/>
                    
                    <Link to='/'><button className="postbuttons" onClick={addPost}>Create Post</button></Link>
                    <button className="postbuttons" onClick={() => setAddPostDisplay(false)}>Cancel</button>
                    
                </div>
            </div> : null} 

        { addMessageDisplay ? 
            <div id="addpost">
                <div>
                    <input placeholder="Title" /><br/>
                    <input placeholder="Description" /><br/>
                    
                    <Link to='/'><button className="postbuttons" >Send</button></Link>
                    <button className="postbuttons" onClick={() => setAddMessageDisplay(false)}>Cancel</button>
                    
                </div>
            </div> : null} 
        
        <div id="posts">
            <input placeholder="Search..." onChange={()=>{setSearchTerm(event.target.value)}}/>
            { props.isLoggedIn ? <><button onClick={() => { setAddPostDisplay(true)}}>Add Post</button><br/></> : null}
            
            {
                props.postList.filter((val) => {
                    if(searchTerm === ""){return val} 
                    else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {return val}
                }).map((post, index) => {
                    return (
                            <React.Fragment key={index}>
                                <div id="post" >
                                    <div id='postUsername'><h5>Username: {post.author.username}</h5> { props.isLoggedIn ? <button onClick={() => { setAddMessageDisplay(true)}}>Message</button> : null } </div>
                                    <h1>Title: {post.title}</h1>
                                    <h2>Price: {post.price}</h2>
                                    <h3>Description:{post.description}</h3>
                                    <h4>Location:{post.location}</h4>
                                    <h5>Will Deliver: { post.willDeliver ? <>Yes</> : <>No</> } </h5>
                                    
                                    
                                    <h5>Posted: {post.createdAt}</h5>
                                </div><br/>
                            </React.Fragment>
                    )
                })
            }
        </div>
        </>
    )
}

export default RenderPage;