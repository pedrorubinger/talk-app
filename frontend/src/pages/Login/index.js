import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BsChatFill } from 'react-icons/bs';
import { MdErrorOutline } from 'react-icons/md';

import './styles.css';
import { validatesSignInData } from '../../utils/dataValidation';
import { sendLoginData, checkAuthentication } from '../../services/auth';
import { readCookie } from '../../utils/handlingCookies';
import { USER_KEY } from '../../utils/constants';

export function Login(props) {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [invalidSignInDataMessage, setInvalidSignInDataMessage] = useState("");
    const [invalidSignInData, setInvalidSignInData] = useState("");
    const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const token = readCookie(USER_KEY);

        if(token) {
            const getAuthentication = async () => {
                checkAuthentication().then(response => {
                    if(response.success) {
                        setUserIsAuthenticated(true);
                        setReady(true);
                    }
                    else {
                        setUserIsAuthenticated(false);
                        setReady(true);
                    }
                }).catch(err => {
                    console.log(err);
                    setReady(true);
                });
            }
    
            getAuthentication();
        } else
            setReady(true);
    }, []);

    const handleSignIn = async event => {
        event.preventDefault();

        setButtonDisabled(true);

        let usernameInput = document.getElementById('username');
        let passwordInput = document.getElementById('password');
        const usernameData = usernameInput.value;
        const passwordData = passwordInput.value;
        const { invalidData, message } = validatesSignInData(usernameData, passwordData);

        if(invalidData) {
            setInvalidSignInData(invalidData);
            setInvalidSignInDataMessage(message);

            if(invalidData === 'both') {
                usernameInput.style.border = '1px solid red';
                passwordInput.style.border = '1px solid red';
            } else if(invalidData === 'nickname') {
                usernameInput.style.border = '1px solid red';
                passwordInput.style.border = '1px solid rgb(170, 170, 170)';
            } else if(invalidData === 'password') {
                usernameInput.style.border = '1px solid rgb(170, 170, 170)';
                passwordInput.style.border = '1px solid red';
            }
        } else {
            usernameInput.style.border = '1px solid rgb(170, 170, 170)';
            passwordInput.style.border = '1px solid rgb(170, 170, 170)';

            if(await sendLoginData(usernameData, passwordData)) {
                setInvalidSignInData("");
                setInvalidSignInDataMessage("");

                await setTimeout(() => {
                    props.history.push('/');
                }, 2000);
            } else {
                setInvalidSignInData("both");
                setInvalidSignInDataMessage("Username or password is invalid!");
            }
        }

        setButtonDisabled(false);
    }

    if(!ready)
        return <h2 className="loading-page-message">Please wait. The page is loading...</h2>

    if(ready && userIsAuthenticated)
        return <Redirect to="/"></Redirect>

    if(ready && !userIsAuthenticated) {
        return(
            <div id="login-container">
                <Link className="link-back-to-home" to="/">
                    <AiFillHome size="18" color="#fff" style={{ marginRight: '8px' }} />
                    <span>Back to home</span>
                </Link>

                <div id="login-form-container">
                    <h1 id="h1-logo" title="TalkApp - Chat Web Application">TalkApp <BsChatFill size="15"></BsChatFill></h1>
                    <Link to="/" id="login-back-to-home-link">
                        Home      
                    </Link>

                    { props.formType === 'signin' ? <h2>Welcome back!</h2> : <h2>You're welcome!</h2>}

                    {
                        invalidSignInData ?
                            <div id="sign-in-error-box">
                                <div id="sign-in-error-message">
                                    <p>
                                        <MdErrorOutline /> {invalidSignInDataMessage}
                                    </p>
                                </div>
                            </div>
                            :
                            ''
                    }

                    <form id="login-form">
                        {
                            props.formType === 'signup' ?
                            <div id="real-name-group">
                                <label htmlFor="real-name">Name</label>
                                <input
                                    type="text"
                                    id="real-name"
                                    placeholder="Your real name"
                                    maxLength="40"
                                ></input>
                            </div>
                                :
                                ''
                        }
                        <div id="username-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                placeholder={props.formType === 'signup' ? "Choose a username" : "Your username"}
                                maxLength="20"
                                autoFocus
                            ></input>
                        </div>

                        {
                            props.formType === 'signup' ?
                            <div id="email-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Your email"
                                    maxLength="40"
                                ></input>
                            </div>
                                :
                                ''
                        }

                        <div id="password-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="*********"
                                maxLength="14"
                            ></input>
                        </div>

                        {
                            props.formType === 'signin' ?
                                <div className="login-link-questions">
                                    <Link to={""} id="forgot-password-link">Forgot your password?</Link>
                                    <Link to="/signup" id="link-sign-up">Don't have an account?</Link>
                                </div>
                                :
                                <div className="login-link-questions">
                                    <Link to="/signin" id="link-sign-up">Already have an account?</Link>
                                </div>
                        }

                        {
                            props.formType === 'signin' ?
                                <button
                                    className="sign-button"
                                    title="Sign in to use the chat!"
                                    onClick={handleSignIn}
                                    disabled={buttonDisabled}
                                >
                                    { buttonDisabled ? "Signing in..." : "Sign In" }
                                </button>
                                    :
                                <button
                                    className="sign-button"
                                    title="Sign up to start using the chat!"
                                    disabled={buttonDisabled}
                                >
                                    { buttonDisabled ? "Signing up..." : "Sign Up" }
                                </button>
                        }
                    </form>
                </div>
            </div>
        );
    }
}