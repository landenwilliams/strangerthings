import React from 'react';
import { Link } from 'react-router-dom';

const RenderHeader = (props) => {
  
    return (
            <header id="header">
                <Link id='title' to='/'><h1>Stranger Things</h1></Link>
                { props.isLoggedIn ? <Link id='login' to='/login'><h2>Logout</h2></Link> :
                <Link id='login' to='/login'><h2>Login/Register</h2></Link>
                
                }
            </header>)
}

export default RenderHeader;