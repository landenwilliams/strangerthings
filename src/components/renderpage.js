import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const RenderPage = (props) => {
    const [ addPostDisplay, setAddPostDisplay ] = useState (false);
    const [ addMessageDisplay, setAddMessageDisplay ] = useState(false);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ postTitle, setPostTitle] = useState('');
    const [ postDescript, setPostDescript ] = useState('');
    const [ postPrice, setPostPrice ] = useState('');
    const [ postLocation, setPostLocation ] = useState('');

    const token = window.localStorage.getItem('token');


    const addPost = () => {
        fetch('https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am/posts', {
        method: "POST",
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
    console.log(result);
  })
  .catch(console.error);
        
    }

  
    
    return (
        <>
        { addPostDisplay ? 
            <div id="addpost">
                <div>
                    <input placeholder="Title" onChange={() => {setPostTitle(event.target.value)}}/><br/>
                    <input placeholder="Description" onChange={() =>{setPostDescript(event.target.value)}}/><br/>
                    <input placeholder="Price" type="number" onChange={() => {setPostPrice(event.target.value)}}/><br/>
                    <input placeholder="Location" onChange={() => {setPostLocation(event.target.value)}}/><br/>
                    
                    <Link to='/'><button className="postbuttons" onClick={addPost}>Create Post</button></Link>
                    <button className="postbuttons" onClick={() => setAddPostDisplay(false)}>Cancel</button>
                    
                </div>
            </div> : null} 

        { addMessageDisplay ? 
            <div id="addpost">
                <div>
                    <input placeholder="Message" /><br/>
                    
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