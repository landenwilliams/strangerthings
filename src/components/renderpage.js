import React, {useState, useEffect} from 'react';

const RenderPage = (props) => {
    const [ addPostDisplay, setAddPostDisplay ] = useState (false);

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
        <ol>
            { props.isLoggedIn ? <button onClick={addPost}>Add Post</button> : null}
            
            {
                props.postList.map((post, index) => {
                    return <li key={index}>{post.author.username}</li>
                })
            }
        </ol>
        </>
    )
}

export default RenderPage;