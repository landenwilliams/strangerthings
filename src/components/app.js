import React, { useEffect, useState } from 'react';
import RenderHeader from './renderheader.js';
import RenderPage from './renderpage.js';


const App = () => {
    const [ postList, setPostList ] = useState([]);

    useEffect(() => {

        const getPost = async() => {

            try{
                const response = await fetch('https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am/posts');
                const data = await response.json();
                // console.log(data.data.posts[0].author.username);
                const posts = data.data.posts;
                setPostList(posts);
       
        
            }   catch (error){
                console.log("api not loading");
            }

    } 

        getPost();

    }, [])

    console.log(postList);

    return (
        <><RenderHeader/><RenderPage postList={postList}/></>
    )
}

export default App;