import React from 'react';
import { Link } from 'react-router-dom';

import { BsChatFill } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { MdSend } from 'react-icons/md';
import { IoMdAttach } from 'react-icons/io';

import './styles.css';
import imgDefaultProfilePhoto from '../../assets/profile-default.jpg';

export function Chat() {
    return(
        <div id="chat-page-container">
            <Link className="link-back-to-home" to="/">
                <AiFillHome size="18" color="#fff" style={{ marginRight: '8px' }} />Back to home
            </Link>

            <div id="chat-container">
                <div id="chat-info">
                    <h1 id="h1-logo" title="TalkApp - Chat Web Application">
                        TalkApp <BsChatFill size="13" />
                    </h1>

                    <div id="chat-user-info">
                        <img
                            id="chat-user-info-profile-photo"
                            className="chat-info-profile-photo"
                            src={imgDefaultProfilePhoto}
                            alt="profile"
                            width="40px"
                            height="40px"
                        />

                        <div id="chat-user-info-name">
                            <p>Pedro Rubinger</p>
                            <span>Settings</span>
                        </div>
                    </div>

                    <input
                        id="chat-user-info-search-contact"
                        placeholder="Search or start new chat"
                        max="20" 
                    />

                    <div id="chat-user-info-chats-list">
                        <ul>
                            <li>
                                <div className="chat-info-contact-item">
                                    <img
                                        src={imgDefaultProfilePhoto}
                                        className="chat-info-profile-photo"
                                        alt="profile"
                                    />
                                    
                                    <div className="chat-info-contact-name">
                                        <p>John Doe</p>
                                        <p className="chat-info-contact-last-seen">Last seen 2020-08-15 at 07:55</p>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="chat-info-contact-item">
                                    <img
                                        src={imgDefaultProfilePhoto}
                                        className="chat-info-profile-photo"
                                        alt="profile"
                                    />
                                    
                                    <div className="chat-info-contact-name">
                                        <p>John Doe</p>
                                        <p className="chat-info-contact-last-seen">Last seen today at 07:55</p>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="chat-info-contact-item">
                                    <img
                                        src={imgDefaultProfilePhoto}
                                        className="chat-info-profile-photo"
                                        alt="profile"
                                    />
                                    
                                    <div className="chat-info-contact-name">
                                        <p>John Doe</p>
                                        <p className="chat-info-contact-last-seen">Last seen today at 07:55</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div className="chat-info-contact-item">
                                    <img
                                        src={imgDefaultProfilePhoto}
                                        className="chat-info-profile-photo"
                                        alt="profile"
                                    />
                                    
                                    <div className="chat-info-contact-name">
                                        <p>John Doe</p>
                                        <p className="chat-info-contact-last-seen">Last seen today at 07:55</p>
                                    </div>
                                </div>
                            </li>
                            
                            <li>
                                <div className="chat-info-contact-item">
                                    <img
                                        src={imgDefaultProfilePhoto}
                                        className="chat-info-profile-photo"
                                        alt="profile"
                                    />
                                    
                                    <div className="chat-info-contact-name">
                                        <p>John Doe</p>
                                        <p className="chat-info-contact-last-seen">Last seen today at 07:55</p>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="chat-info-contact-item">
                                    <img
                                        src={imgDefaultProfilePhoto}
                                        className="chat-info-profile-photo"
                                        alt="profile"
                                    />
                                    
                                    <div className="chat-info-contact-name">
                                        <p>John Doe</p>
                                        <p className="chat-info-contact-last-seen">Last seen today at 07:55</p>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="chat-info-contact-item">
                                    <img
                                        src={imgDefaultProfilePhoto}
                                        className="chat-info-profile-photo"
                                        alt="profile"
                                    />
                                    
                                    <div className="chat-info-contact-name">
                                        <p>John Doe</p>
                                        <p className="chat-info-contact-last-seen">Last seen today at 07:55</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                
                {/* <div id="chat-default-message">
                    <h3>Welcome to the TalkApp <BsChatFill size="20" /></h3>
                    <p>Select a conversation on the left or start a new one!</p>
                </div> */}

                <div id="chat-content">
                    <div id="chat-contact-info">
                        <img
                            id="chat-contact-profile-photo"
                            src={imgDefaultProfilePhoto}
                            alt="profile"
                            width="40px"
                            height="40px"
                        />

                        <div id="chat-contact-name-status">
                            <p>Jane Doe</p>
                            <p>online</p>
                        </div>
                    </div>

                    <div id="messages">
                        <p className="message">
                            Hello, John!&nbsp;&nbsp;
                            <span className="message-time">14:00</span>
                        </p>
                        
                        <p className="message">
                            How are you?&nbsp;&nbsp;
                            <span className="message-time">14:00</span>
                        </p>
                    </div>

                    <div id="chat-send-message-area">
                        <textarea
                            id="chat-textarea-message"
                            name="message"
                            rows="5"
                            cols="6"
                            placeholder="Type something..."
                            maxLength="300">
                        </textarea>

                        <button className="chat-button-message">
                            <MdSend size="14"/>
                        </button>

                        <button className="chat-button-message">
                            <IoMdAttach size="16" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}