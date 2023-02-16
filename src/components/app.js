import React, { useEffect, useState } from 'react';
import RenderHeader from './renderheader.js';
import RenderPage from './renderpage.js';
import LogIn from './login.js'
import { HashRouter, Routes, Route } from 'react-router-dom';



const App = () => {
    const [ postList, setPostList ] = useState([]);
    const [ isLoggedIn, setIsLoggedIn ] = useState(window.localStorage.getItem('token'));

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
        <>
            <RenderHeader isLoggedIn={isLoggedIn}/>
            <Routes>
                <Route path='/' element={<RenderPage postList={postList} isLoggedIn={isLoggedIn}/>} ></Route>
                <Route path='/login' element={<LogIn setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}></Route>
            </Routes>
        </>
    )
}

export default App;