import React, {useState, useEffect} from 'react';

const RenderPage = (props) => {
    const [ addPostDisplay, setAddPostDisplay ] = useState (false);
    const [ searchTerm, setSearchTerm ] = useState('');

    const addPost = () => {

        setAddPostDisplay(true);
        
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
                    
                    <button className="postbuttons">Create Post</button>
                    <button className="postbuttons" onClick={() => setAddPostDisplay(false)}>Cancel</button>
                    
                </div>
            </div> : null} 
        
        <div id="posts">
            { props.isLoggedIn ? <><input placeholder="Search..." onChange={()=>{setSearchTerm(event.target.value)}}/><button onClick={addPost}>Add Post</button><br/></> : null}
            
            {
                props.postList.filter((val) => {
                    if(searchTerm === ""){return val} 
                    else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {return val}
                }).map((post, index) => {
                    return (
                            <React.Fragment key={index}>
                                <div id="post" >
                                    <div id='postUsername'><h5>Username: {post.author.username}</h5> { props.isLoggedIn ? <button>Message</button> : null } </div>
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