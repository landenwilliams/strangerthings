import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

const LogIn = (props) => {
    console.log(props.isLoggedIn);
    const [ showLoginButton, setShowLoginButton ] = useState(true);

    const logIn = () => {
        //call an api with fetch
        window.localStorage.setItem('token',  'adsfasdfdas');
        props.setIsLoggedIn(true);
        
    }
    const logOut = () => {
        window.localStorage.removeItem('token');
        props.setIsLoggedIn(false);
    }

    return (
        
        <div id="logintable">
            
            
            <form id="login-form">
                <input type="text" name="username" placeholder="username"/>
                <input type="test" name="password" placeholder="password"></input>
                {
                    showLoginButton ? 
                        <>
                            <Link to="/"><button onClick={logIn} >Login</button></Link><br/>
                            <Link className="registerlink" onClick={() => setShowLoginButton(false)}><h5>Not registered? Click Here!</h5></Link>
                        </> : <>
                            <input type="test" name="confirm" placeholder="confirm password"></input>
                            <button>Register</button>
                            <Link className="registerlink" onClick={() => setShowLoginButton(true)}><h5>Already Registered? Click Here!</h5></Link>
                        </>
                }
            </form>
            
            
        </div>
        
        
        
    )
}

export default LogIn;