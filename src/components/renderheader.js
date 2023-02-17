import React from 'react';
import { Link } from 'react-router-dom';

const RenderHeader = (props) => {
  
    return (
            <header id="header">
                <Link id='title' to='/'><h1>Stranger Things</h1></Link>
                { props.isLoggedIn ? <><Link id='profile' className="headerlinks" ><h2>Profile</h2></Link><Link className="headerlinks" id='logout' onClick={() => props.setIsLoggedIn(false)}><h2>Logout</h2></Link></> :
                <Link id='login' to='/login' className="headerlinks"><h2>Login/Register</h2></Link>
                
                }
            </header>)
}

export default RenderHeader;