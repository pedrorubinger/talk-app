import React, { useState } from 'react';
import { AiFillHome, AiFillFacebook } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import './styles.css';
import defaultAvatarImg from '../../assets/profile-default.jpg';
import { FiInstagram } from 'react-icons/fi';


export function Profile() {
    const [discardChangesProccess, setDiscardLoading] = useState(false);
    const [saveChangesProccess, setSaveLoading] = useState(false);
    const [buttonsAreDisabled, setButtons] = useState(false);
    const [editForm, setEditForm] = useState(false);

    const showEditForm = event => {
        event.preventDefault();

        document.getElementById('edit-profile-button').style.display = 'none';
        document.getElementById('profile-container').style.height = '1100px';

        setEditForm(true);
    }

    const hideEditForm = event => {
        event.preventDefault();
        setDiscardLoading(true);
        setButtons(true);

        document.getElementById('edit-profile-button').style.display = 'block';
        document.getElementById('profile-container').style.height = 'auto';

        setDiscardLoading(false);
        setButtons(false);
        setEditForm(false);
    }

    const submitAccountEditing = event => {
        event.preventDefault();
        setButtons(true);
        setSaveLoading(true);

        console.log('Code here...');

        setSaveLoading(false);
        setButtons(false);
        // setEditForm(false);
    }

    return(
        <div id="profile-container">
            <Link className="link-back-to-home" to="/" >
                <AiFillHome size="18" color="black" style={{ marginRight: '8px' }} />
                <span>Back to home</span>
            </Link>

            {/* <h1>Profile</h1> */}

            <div id="profile-content">
                <h2>Personal Information</h2>

                <div id="profile-personal-info-box">
                    <img
                        src={defaultAvatarImg}
                        id="profile-personal-info-img"
                        width="155"
                        height="155"
                        alt="Avatar"
                    />

                    <div id="profile-personal-info-data">
                        <h3>Pedro Rubinger</h3>

                        <p>
                            <b>Nick:</b>
                            &nbsp;&nbsp;Pedro
                        </p>
                        
                        <p>
                            <b>Email:</b>
                            &nbsp;&nbsp;pedro@mail.com
                        </p>

                        <p>
                            <b>Last visit:</b>
                            &nbsp;&nbsp;10/09/2020 18:23
                        </p>

                        <p>
                            <b>Social:</b>
                            &nbsp;&nbsp;<FiInstagram size="18" />
                            &nbsp;<AiFillFacebook size="18" />
                        </p>
                    </div>
                </div>

                <button id="edit-profile-button" onClick={showEditForm}>
                    Edit Profile
                </button>

                { editForm ? <h2>Account Editing</h2> : '' }

                {
                    editForm ?
                        <div id="profile-personal-edit-box">
                            <div className="edit-profile-input-group">
                                <label>
                                    Name <span style={{ color: 'red' }}>*</span>
                                </label>
        
                                <input
                                    type="text"
                                    placeholder="Enter your name">
                                </input>
                            </div>

                            <div className="edit-profile-input-group">
                                <label>
                                    Email <span style={{ color: 'red' }}>*</span>
                                </label>
        
                                <input
                                    type="email"
                                    placeholder="Enter your new email address">
                                </input>
                            </div>

                            <div className="edit-profile-input-group">
                                <label>
                                    Current Password <span style={{ color: 'red' }}>*</span>
                                </label>
        
                                <input
                                    type="password"
                                    placeholder="Enter your current password">
                                </input>
                            </div>

                            <div className="edit-profile-input-group">
                                <label>
                                    New password <span style={{ color: 'red' }}>*</span>
                                </label>
                                
                                <input
                                    type="password"
                                    placeholder="Enter your new password">
                                </input>
                            </div>

                            <div className="edit-profile-input-group">
                                <label>Instagram:</label>
                                
                                <input
                                    type="text"
                                    placeholder="Enter your Instagram URL">
                                </input>
                            </div>

                            <div className="edit-profile-input-group">
                                <label>Facebook:</label>
                                <input
                                    type="text"
                                    placeholder="Enter your Facebook URL">
                                </input>
                            </div>

                            <div id="edit-profile-buttons-group">
                                <button
                                    id="edit-profile-save-button"
                                    title="Save changes and update your profile"
                                    onClick={submitAccountEditing}
                                    disabled={buttonsAreDisabled}
                                >
                                    { saveChangesProccess ? "Saving..." : "Save Changes" }
                                </button>

                                <button
                                    id="edit-profile-discard-button"
                                    title="Discard changes and keep everything as it was" 
                                    onClick={hideEditForm}
                                    disabled={buttonsAreDisabled}
                                >
                                    { discardChangesProccess ? "Discarding..." : "Discard Changes" }
                                </button>
                            </div>
                        </div>
                    : ''
                }
            </div>
        </div>
    );
}