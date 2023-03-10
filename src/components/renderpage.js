import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RenderPage = (props) => {
    const [addPostDisplay, setAddPostDisplay] = useState(false);
    const [addMessageDisplay, setAddMessageDisplay] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postDescript, setPostDescript] = useState('');
    const [postPrice, setPostPrice] = useState('');
    const [postLocation, setPostLocation] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [currentPost, setCurrentPost] = useState({});
    

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

                // console.log(result);
            })
            .catch(console.error);


    }

    const sendMessage = async () => {
        
        setAddMessageDisplay(false);
        fetch(`https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am/posts/${currentPost._id}/messages`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: {
                    content: `${messageContent}`
                }
            })
            
        }).then(response => response.json())
            .then(result => {
                console.log('i am running')
                // console.log(result);

            })
            .catch(console.error);
    }
    const testFunc = async () => {
        console.log("will this run twice?")
      }






    const messageOnClick = (post) => {
        setAddMessageDisplay(true);
        setCurrentPost(post);
    }
    return (
        <>
            {addPostDisplay ?
                <div className="popupbox">
                    <div >
                        <input placeholder="Title" onChange={() => { setPostTitle(event.target.value) }} /><br />
                        <input placeholder="Description" onChange={() => { setPostDescript(event.target.value) }} /><br />
                        <input placeholder="Price" type="number" onChange={() => { setPostPrice(event.target.value) }} /><br />
                        <input placeholder="Location" onChange={() => { setPostLocation(event.target.value) }} /><br /><br/>

                        <button className="postbuttons" onClick={addPost}>Create Post</button>
                        <button className="postbuttons" onClick={() => setAddPostDisplay(false)}>Cancel</button>

                    </div>
                </div> : null}

            {addMessageDisplay ?
                <div className="popupbox">
                    <div>
                        <input placeholder="Message..." onChange={(event) => { setMessageContent(event.target.value) }} /><br /><br/>

                        <button className="postbuttons" onClick={sendMessage}>Send</button>
                        <button className="postbuttons" onClick={() => setAddMessageDisplay(false)}>Cancel</button>

                    </div>
                </div> : null}

            <div id="posts">
                <input id="searchinput" placeholder="Search..." onChange={() => { setSearchTerm(event.target.value) }} />
                {props.isLoggedIn ? <><button onClick={() => { setAddPostDisplay(true) }}>Add Post</button><br /></> : null}

                {
                    props.postList.filter((val) => {
                        if (searchTerm === "") { return val }
                        else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) { return val }
                    }).map((post, index) => {
                        return (
                            <React.Fragment key={index}>

                                <div id="post" >
                                    <div id='postUsername'><h5>Username: {post.author.username}</h5> {props.isLoggedIn ? <button onClick={() => { messageOnClick(post) }}>Message</button> : null} </div>
                                    <h1>Title: {post.title}</h1>
                                    <h2>Price: {post.price}</h2>
                                    <h3>Description:{post.description}</h3>
                                    <h4>Location:{post.location}</h4>
                                    <h5>Will Deliver: {post.willDeliver ? <>Yes</> : <>No</>} </h5>


                                    <h5>Posted: {post.createdAt}</h5>
                                </div><br />
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </>
    )
}

export default RenderPage;