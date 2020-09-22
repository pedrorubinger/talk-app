import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BsChatFill } from 'react-icons/bs';
import { MdErrorOutline } from 'react-icons/md';

import './styles.css';
import { validatesSignInData, validatesSignUpData } from '../../utils/dataValidation';
import { sendLoginData, sendSignUpData, checkAuthentication } from '../../services/auth';
import { readCookie } from '../../utils/handlingCookies';
import { USER_KEY } from '../../utils/constants';

export function Login(props) {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [invalidSignInDataMessage, setInvalidSignInDataMessage] = useState("");
    const [invalidSignInData, setInvalidSignInData] = useState("");
    const [invalidSignUpDataMessage, setInvalidSignUpDataMessage] = useState([""]);
    const [invalidSignUpData, setInvalidSignUpData] = useState("");
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
                    } else {
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

    const setInvalidInputField = (fields = []) => {
        let usernameInput = document.getElementById('username');
        let passwordInput = document.getElementById('password');

        if(props.formType === 'signup') {
            let realNameInput = document.getElementById('realName');
            let emailInput = document.getElementById('email');

            if(fields.indexOf('valid') !== -1) {
                realNameInput.style.border = '1px solid rgb(170, 170, 170)';
                usernameInput.style.border = '1px solid rgb(170, 170, 170)';
                emailInput.style.border = '1px solid rgb(170, 170, 170)';
                passwordInput.style.border = '1px solid rgb(170, 170, 170)';
            }

            if(fields.indexOf('realName') === -1)
                realNameInput.style.border = '1px solid rgb(170, 170, 170)';
            else
                realNameInput.style.border = '1px solid red';

            if(fields.indexOf('username') === -1)
                usernameInput.style.border = '1px solid rgb(170, 170, 170)';
            else
                usernameInput.style.border = '1px solid red';

            if(fields.indexOf('email') === -1)
                emailInput.style.border = '1px solid rgb(170, 170, 170)';
            else
                emailInput.style.border = '1px solid red';

            if(fields.indexOf('password') === -1)
                passwordInput.style.border = '1px solid rgb(170, 170, 170)';
            else
                passwordInput.style.border = '1px solid red';
        } else {
            if(fields.indexOf('valid') !== -1) {
                usernameInput.style.border = '1px solid rgb(170, 170, 170)';
                passwordInput.style.border = '1px solid rgb(170, 170, 170)';
            } else if(fields.indexOf('nickname') !== -1 && fields.indexOf('password') !== -1) {
                usernameInput.style.border = '1px solid red';
                passwordInput.style.border = '1px solid red';
            } else if(fields.indexOf('nickname') !== -1) {
                usernameInput.style.border = '1px solid red';
                passwordInput.style.border = '1px solid rgb(170, 170, 170)';
            } else if(fields.indexOf('password') !== -1) {
                passwordInput.style.border = '1px solid red';
                usernameInput.style.border = '1px solid rgb(170, 170, 170)';
            }
        }
    }

    const handleSignIn = async event => {
        event.preventDefault();

        setButtonDisabled(true);

        const usernameData = document.getElementById('username').value;
        const passwordData = document.getElementById('password').value;
        const { invalidData, message } = validatesSignInData(usernameData, passwordData);

        if(invalidData) {
            setInvalidSignInData(invalidData);
            setInvalidSignInDataMessage(message);

            if(invalidData === 'both')
                setInvalidInputField(['nickname', 'password']);
            else if(invalidData === 'nickname')
                setInvalidInputField(['nickname']);
            else if(invalidData === 'password')
                setInvalidInputField(['password']);

            setButtonDisabled(false);
        } else {
            setInvalidInputField('valid');

            const response = await sendLoginData(usernameData, passwordData);

            if(response.success) {
                setInvalidSignInData('');
                setInvalidSignInDataMessage('');

                await setTimeout(() => {
                    props.history.push('/');
                }, 2000);
            } else {
                setButtonDisabled(false);
                setInvalidSignInData('both');
                setInvalidInputField(['nickname', 'password']);
                setInvalidSignInDataMessage(response.message);
            }
        }
    };

    const handleSignUp = async event => {
        event.preventDefault();

        setButtonDisabled(true);

        const realNameData = document.getElementById('realName').value;
        const usernameData = document.getElementById('username').value;
        const emailData = document.getElementById('email').value;
        const passwordData = document.getElementById('password').value;
        const { invalidFields, hasEmptyField, hasNotAllowedChars } = validatesSignUpData(realNameData, usernameData, emailData, passwordData);

        if(invalidFields.length > 0) {
            const messages = [
                    (hasEmptyField ? 'You must fill in all the fields!' : ''),
                    (hasNotAllowedChars ? 'You must use only allowed characters!' : '')
            ];

            setInvalidSignUpData(invalidFields);
            setInvalidSignUpDataMessage(messages);
            setInvalidInputField(invalidFields);
            setButtonDisabled(false);
        } else {
            setInvalidInputField('valid');

            const result = await sendSignUpData(realNameData, usernameData, emailData, passwordData);

            if(result.success) {
                setInvalidSignUpData('');
                setInvalidSignUpDataMessage('');
                await sendLoginData(usernameData, passwordData)

                await setTimeout(() => {
                    props.history.push('/');
                }, 2000);
            } else {
                setButtonDisabled(false);
                setInvalidSignUpData([result.invalidField]);
                setInvalidSignUpDataMessage([result.message]);
                setInvalidInputField([result.invalidField]);
            }
        }
    }

    const clearErrorMessages = () => {
        // setInvalidInputField([]);
        clearFields();
        setInvalidSignInData('');
        setInvalidSignInDataMessage('');
        setInvalidSignUpData('');
        setInvalidSignUpDataMessage(['']);
        setInvalidInputField('valid');
    }

    const clearFields = () => {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';

        if(props.formType === 'signup') {
            document.getElementById('realName').value = '';
            document.getElementById('email').value = '';
        }
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
                        invalidSignInData && props.formType === 'signin' ?
                            <div className="error-messages-box">
                                <div id="sign-in-error-message">
                                    <p>
                                        <MdErrorOutline /> {invalidSignInDataMessage}
                                    </p>
                                </div>
                            </div>
                            :
                            ''
                    }

                    {
                        invalidSignUpData && props.formType === 'signup' ?
                            <div className="error-messages-box">
                                <div id="sign-in-error-message">
                                    {
                                        invalidSignUpDataMessage.map(message => {
                                            if(message)
                                                return(
                                                    <p key={message}>
                                                        <MdErrorOutline /> {message}
                                                    </p>
                                                );
                                            return '';
                                        })
                                    }
                                </div>
                            </div>
                            :
                            ''
                    }

                    <form id="login-form">
                        {
                            props.formType === 'signup' ?
                            <div id="real-name-group">
                                <label htmlFor="realName">Name</label>
                                <input
                                    type="text"
                                    id="realName"
                                    placeholder="Your real name"
                                    maxLength="40"
                                    autoFocus
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
                                autoFocus={props.formType === 'signup' ? false : true}
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
                                    <Link 
                                        to="/signup"
                                        id="link-sign-up"
                                        onClick={clearErrorMessages}>Don't have an account?</Link>
                                </div>
                                :
                                <div className="login-link-questions">
                                    <Link to="/signin" id="link-sign-up"
                                        onClick={clearErrorMessages}>Already have an account?</Link>
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
                                    onClick={handleSignUp}
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