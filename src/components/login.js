import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { Link, Navigate } from 'react-router-dom';

const LogIn = (props) => {
    // console.log(props.isLoggedIn);

    const [showLoginButton, setShowLoginButton] = useState(true);
    const [loginName, setLoginName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [invalidLogin, setInvalidLogin] = useState(false);
    const [loginToken, setLoginToken] = useState('');
    const [invalidPasswordConfirmation, setInvalidPasswordConformation] = useState(false);

    const logIn = async (e) => {
        e.preventDefault();
        //call an api with fetch
        // console.log(loginName);
        // console.log(loginPassword);
        fetch('https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: `${loginName}`,
                    password: `${loginPassword}`
                }
            })
        }).then(response => response.json())
            .then(result => {
                if (result.success === true) {
                    setLoginToken(result.data.token);
                    // console.log(result.data.token);
                    window.localStorage.setItem('token', `${result.data.token}`);
                    return props.setIsLoggedIn(true);

                } else {
                    return (setInvalidLogin(true));

                }
            })
            .catch(console.error);

    }

    const register = (e) => {
        e.preventDefault();

        if (loginPassword === confirmPassword) {
            fetch('https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am/users/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: `${loginName}`,
                        password: `${loginPassword}`
                    }
                })
            }).then(response => response.json())
                .then(result => {
                    // console.log(result);
                })
                .catch(console.error);
        }
        else {
            // e.preventDefault();
            return (setInvalidPasswordConformation(true));
            // console.log('password does not match')
        }
    }



    return (
        <>
            {props.isLoggedIn ? <Navigate to="/" /> : null}
            <div id="logintable">


                <form id="login-form">
                    <input className="logininput" type="text" name="username" placeholder="username" onChange={() => { setLoginName(event.target.value) }} />
                    <input className="logininput" type="password" name="password" placeholder="password" onChange={() => { setLoginPassword(event.target.value) }}></input>
                    {
                        showLoginButton ?
                            <>
                                <button onClick={logIn} >Login</button><br />
                                <Link className="registerlink" onClick={() => setShowLoginButton(false)}><h5>Not registered? Click Here!</h5></Link>
                            </> : <>
                                <input className="logininput" type="password" name="confirm" placeholder="confirm password" onChange={() => { setConfirmPassword(event.target.value) }}></input>
                                <button onClick={register}>Register</button>
                                <Link className="registerlink" onClick={() => setShowLoginButton(true)}><h5>Already Registered? Click Here!</h5></Link>
                            </>
                    }
                    {
                        invalidLogin ?
                            <h5>Login was invalid. Please try again.</h5> : null
                    }
                    {
                        invalidPasswordConfirmation ?
                            <h5>Passwords do not match. Please try again.</h5> : null
                    }


                </form>


            </div>
        </>


    )
}

export default LogIn;