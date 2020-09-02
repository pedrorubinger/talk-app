import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BsChatFill } from 'react-icons/bs';

import './styles.css';

export function Login(props) {
    return(
        <div id="login-container">
            <Link className="link-back-to-home" to="/">
                <AiFillHome size="18" color="#fff" style={{ marginRight: '8px' }} />Back to home
            </Link>

            <div id="login-form-container">
                <h1 id="h1-logo" title="TalkApp - Chat Web Application">TalkApp <BsChatFill size="15"></BsChatFill></h1>
                { props.formType === 'signin' ? <h2>Welcome back!</h2> : <h2>You're welcome!</h2>}

                <form id="login-form">
                    <div id="username-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Your username"
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
                            >
                                Sign In
                            </button>
                                :
                            <button
                                className="sign-button"
                                title="Sign up to start using the chat!"
                            >
                                Sign Up
                            </button>
                    }
                </form>
            </div>
        </div>
    );
}