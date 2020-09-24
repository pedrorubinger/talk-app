import React, { useState, useEffect } from 'react';
import { AiFillFacebook } from 'react-icons/ai';
import { FiInstagram } from 'react-icons/fi';
import { MdErrorOutline } from 'react-icons/md';
import swal from 'sweetalert';
import Axios from 'axios';

import './styles.css';
import defaultAvatarImg from '../../assets/profile-default.jpg';
import { api } from '../../services/api';
import { validatesProfileData } from '../../utils/dataValidation';
import { readCookie } from '../../utils/handlingCookies';
import { USER_KEY, SERVER_BASE_URL } from '../../utils/constants';
import { SearchPepopleBar } from '../../components/SearchPeopleBar';
import Contacts from '../../components/Contacts';

export function Profile(props) {
    // Buttons and form visibility
    const [discardChangesProccess, setDiscardLoading] = useState(false);
    const [saveChangesProccess, setSaveLoading] = useState(false);
    const [buttonsAreDisabled, setDisableButtons] = useState(false);
    const [editForm, setEditForm] = useState(false);
    // Profile data
    const [userName, setUsername] = useState('');
    const [userNick, setUserNick] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userLastVisit, setUserLastVisit] = useState('');
    const [userInstagram, setUserInstagram] = useState('');
    const [userFacebook, setUserFacebook] = useState('');
    // Input data
    const [currentUserPasswordField, setCurrentUserPasswordField] = useState('');
    const [newUserPasswordField, setNewUserPasswordField] = useState('');
    const [userNameField, setUsernameField] = useState('');
    const [userEmailField, setUserEmailField] = useState('');
    const [userInstagramField, setUserInstagramField] = useState('');
    const [userFacebookField, setUserFacebookField] = useState('');
    // Data validation
    const [invalidAccountEditingDataMessage, setInvalidAccountEditingDataMessage] = useState('');
    // Component did mount
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const api = Axios.create({
            baseURL: SERVER_BASE_URL,
            headers: {
                'x-access-token': readCookie(USER_KEY)
            }
        });

        const getProfileData = async () => {
            await api.get('/api/user/get/id/' + props.userId)
                .then(response => {
                    if(response.data.success) {
                        // Personal Information - View
                        setUsername(response.data.name);
                        setUserEmail(response.data.email);
                        setUserInstagram(response.data.instagram);
                        setUserFacebook(response.data.facebook);
                        // Account Editing - Inputs
                        setUsernameField(response.data.name);
                        setUserNick(response.data.nick);
                        setUserEmailField(response.data.email);
                        setUserLastVisit(response.data.last_visit);
                        setUserInstagramField(response.data.instagram);
                        setUserFacebookField(response.data.facebook);
                    }
                })
                .catch(error => {
                    console.log(error.response.data);
                });

            setReady(true);
        }

        getProfileData();
    }, [props.userId]);

    const showEditForm = event => {
        event.preventDefault();

        document.getElementById('edit-profile-button').style.display = 'none';
        document.getElementById('profile-container').style.height = '1250px';

        setEditForm(true);
    }

    const hideEditForm = event => {
        event.preventDefault();
        setDiscardLoading(true);
        setDisableButtons(true);

        document.getElementById('edit-profile-button').style.display = 'block';
        document.getElementById('profile-container').style.height = '700px';

        setUsernameField(userName);
        setUserNick(userNick);
        setUserEmailField(userEmail);
        setUserInstagramField(userInstagram);
        setUserFacebookField(userFacebook);
        setDiscardLoading(false);
        showInvalidInput('valid');
        setInvalidAccountEditingDataMessage('');
        setDisableButtons(false);
        setEditForm(false);
    }

    const updateProfile = async data => {
        return await api.put('/api/user/profile/update/', data).then(response => {
            if(response.status === 200)
                return true;
        }).catch(() => {
            return false;
        });
    }

    const showInvalidInput = (fields = []) => {
        let usernameInput = document.getElementById('profile-name');
        let emailInput = document.getElementById('profile-email');
        let currentPasswordInput = document.getElementById('profile-current-password');
        let newPasswordInput = document.getElementById('profile-new-password');
        let facebookInput = document.getElementById('profile-facebook');
        let instagramInput = document.getElementById('profile-instagram');

        if(fields.indexOf('valid') !== -1) {            
            usernameInput.style.border = '1px solid rgb(170, 170, 170)';
            emailInput.style.border = '1px solid rgb(170, 170, 170)';
            currentPasswordInput.style.border = '1px solid rgb(170, 170, 170)';
            newPasswordInput.style.border = '1px solid rgb(170, 170, 170)';
            facebookInput.style.border = '1px solid rgb(170, 170, 170)';
            instagramInput.style.border = '1px solid rgb(170, 170, 170)';
        }

        if(fields.indexOf('realName') === -1)
                usernameInput.style.border = '1px solid rgb(170, 170, 170)';
        else
            usernameInput.style.border = '1px solid red';

        if(fields.indexOf('email') === -1)
            emailInput.style.border = '1px solid rgb(170, 170, 170)';
        else
            emailInput.style.border = '1px solid red';

        if(fields.indexOf('currentPassword') === -1)
            currentPasswordInput.style.border = '1px solid rgb(170, 170, 170)';
        else
            currentPasswordInput.style.border = '1px solid red';

        if(fields.indexOf('newPassword') === -1)
            newPasswordInput.style.border = '1px solid rgb(170, 170, 170)';
        else
            newPasswordInput.style.border = '1px solid red';

        if(fields.indexOf('facebook') === -1)
            facebookInput.style.border = '1px solid rgb(170, 170, 170)';
        else
            facebookInput.style.border = '1px solid red';

        if(fields.indexOf('instagram') === -1)
            instagramInput.style.border = '1px solid rgb(170, 170, 170)';
        else
            instagramInput.style.border = '1px solid red';
    }

    const checkEmail = async data => {
        return await api.get('/api/user/get/email/' + data.user_email).then(response => {
            if(response.status === 200) 
                return { success: false, invalidField: 'email', message: 'This email is already registered!' };
        }).catch(async error => {
            if(error.response.status === 404) {
                if(await updateProfile(data))
                    return { success: true, message: 'The profile has been updated!' };
                else
                    return { success: false, invalidField: 'error', message: 'An unexpected error has occurred!' };
            } else return { success: false, invalidField: 'error', message: 'An internal error has occurred!' };
        });
    }

    const submitAccountEditing = async event => {
        event.preventDefault();
        setDisableButtons(true);
        setSaveLoading(true);

        let password = (newUserPasswordField !== '' ? newUserPasswordField : currentUserPasswordField);
        const {
            invalidFields,
            hasEmptyField,
            hasNotAllowedChars
        } = await validatesProfileData(userNameField, userEmailField, currentUserPasswordField, 
                newUserPasswordField, userInstagramField, userFacebookField);

        if(invalidFields.length > 0) {
            const messages = [
                    (hasEmptyField ? 'You must complete all required fields (*)!' : ''),
                    (hasNotAllowedChars ? 'You must use only allowed characters!' : '')
            ];

            setInvalidAccountEditingDataMessage(messages);
            showInvalidInput(invalidFields);
            setDisableButtons(true);
        } else {
            showInvalidInput('valid');

            const passwordIsValid = await api.post('/api/user/signin', { user_nick: userNick, user_password: currentUserPasswordField })
                .then(response => {
                    if(response.data.success)
                        return true;
                    else
                        return false;
                }).catch(() => {
                        return false;
                });

            if(passwordIsValid) {
                const data = {
                    user_name: userNameField,
                    user_nick: userNick,
                    user_password: password,
                    user_email: userEmailField,
                    user_instagram_account: (userInstagramField === '' ? null : userInstagramField),
                    user_facebook_account: (userFacebookField === '' ? null : userFacebookField),
                    user_id: props.userId
                }

                if(userEmailField !== userEmail) {
                    const result = await checkEmail(data);

                    if(result.success) {
                        showInvalidInput('valid');
                        setInvalidAccountEditingDataMessage('');

                        swal({
                            title: "SUCCESS!",
                            text: "Your profile has been updated!",
                            icon: "success",
                            buttons: "Gotcha!",
                            closeOnClickOutside: false
                        }).then(() => {
                            window.location.reload();
                        });
                    } else {
                        showInvalidInput([result.invalidField]);
                        setInvalidAccountEditingDataMessage([result.message]);
                    }
                } else {
                    if(updateProfile(data)) {
                        showInvalidInput('valid');
                        setInvalidAccountEditingDataMessage('');
                        
                        swal({
                            title: "SUCCESS!",
                            text: "Your profile has been updated!",
                            icon: "success",
                            buttons: "Gotcha!",
                            closeOnClickOutside: false
                        }).then(() => {
                            window.location.reload();
                        });
                    } else {
                        showInvalidInput('valid');
                        setInvalidAccountEditingDataMessage('An internal error has occurred!');
                    }
                }
            } else {
                showInvalidInput('currentPassword');
                setInvalidAccountEditingDataMessage(['Current password is invalid!']);
            }
        }

        setSaveLoading(false);
        setDisableButtons(false);
    }

    if(!ready)
        return <h2 className="loading-page-message">Please wait. Your profile is loading...</h2>

    return(
        <div id="profile-container">
            <SearchPepopleBar />

            <div id="profile-main-content">
                <Contacts userId={props.userId} />

                <div id="profile-info-content">
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
                            <h3>{userName}</h3>

                            <p>
                                <b>Nick:</b>
                                &nbsp;&nbsp;{userNick}
                            </p>
                            
                            <p>
                                <b>Email:</b>
                                &nbsp;&nbsp;{userEmail}
                            </p>

                            <p>
                                <b>Last visit:</b>
                                &nbsp;&nbsp;
                                {
                                    userLastVisit
                                        .substring(0, 10)
                                        .split('-')
                                        .reverse()
                                        .join('/') + ' ' + 
                                        new Date(userLastVisit)
                                        .toTimeString()
                                        .substring(0, 5)
                                }
                            </p>

                            <p>
                                <b>Social:</b>&nbsp;&nbsp;
                                {
                                    ((userInstagram === '' || userInstagram === null) &&
                                    (userFacebook === '' || userFacebook === null)) ?
                                    'Not included' : ''
                                }

                                {
                                    ((userInstagram !== '' && userInstagram !== null)
                                        && (userFacebook !== '' && userFacebook !== null)) ?
                                    <span>
                                        <a
                                            href={"https://www.instagram.com/" + (userInstagram || '')}
                                            target="_blank" rel="noopener noreferrer"
                                        >
                                            <FiInstagram color="black" size="18" />
                                        </a>

                                        &nbsp;
                                        <a
                                            href={"https://www.facebook.com/" + (userFacebook || '')}
                                            target="_blank" rel="noopener noreferrer"
                                        >
                                            <AiFillFacebook color="black" size="18" />
                                        </a>
                                    </span>
                                    :
                                    userInstagram !== null && userInstagram !== '' ?
                                        <a
                                            href={"https://www.instagram.com/" + (userInstagram || '')}
                                            target="_blank" rel="noopener noreferrer"    
                                        >
                                            <FiInstagram color="black" size="18" />
                                        </a>
                                        :
                                        userFacebook !== null && userFacebook !== '' ?
                                            <a
                                                href={"https://www.facebook.com/" + (userFacebook || '')}
                                                target="_blank" rel="noopener noreferrer"
                                            >
                                                <AiFillFacebook color="black" size="18" />
                                            </a>
                                            : ''
                                }
                            </p>
                        </div>
                    </div>

                    <button id="edit-profile-button" onClick={showEditForm}>
                        Edit Profile
                    </button>

                    { editForm ? <h2>Account Editing</h2> : '' }
                    
                    {
                        invalidAccountEditingDataMessage ?
                        <div className="error-messages-box">
                            <div id="account-editing-error-message">
                                {
                                    invalidAccountEditingDataMessage.map(message => {
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
                        : ''
                    }

                    {
                        editForm ?
                            <div id="profile-personal-edit-box">
                                <div className="edit-profile-input-group">
                                    <label htmlFor="profile-name">
                                        Name <span style={{ color: 'red' }}>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        id="profile-name"
                                        placeholder="Enter your name"
                                        value={userNameField}
                                        onChange={e => setUsernameField(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="edit-profile-input-group">
                                    <label htmlFor="profile-email">
                                        Email <span style={{ color: 'red' }}>*</span>
                                    </label>
            
                                    <input
                                        type="email"
                                        id="profile-email"
                                        placeholder="Enter your new email address"
                                        value={userEmailField}
                                        onChange={e => setUserEmailField(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="edit-profile-input-group">
                                    <label htmlFor="profile-current-password">
                                        Current Password <span style={{ color: 'red' }}>*</span>
                                    </label>
            
                                    <input
                                        type="password"
                                        id="profile-current-password"
                                        autoFocus
                                        placeholder="Enter your current password"
                                        onChange={e => setCurrentUserPasswordField(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="edit-profile-input-group">
                                    <label htmlFor="profile-new-password">
                                        New password
                                    </label>
                                    
                                    <input
                                        type="password"
                                        id="profile-new-password"
                                        placeholder="Enter your new password"
                                        onChange={e => setNewUserPasswordField(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="edit-profile-input-group">
                                    <label htmlFor="profile-instagram">Instagram:</label>
                                    
                                    <input
                                        type="text"
                                        id="profile-instagram"
                                        placeholder="Enter your Instagram username"
                                        value={userInstagramField === null ? '' : userInstagramField}
                                        onChange={e => setUserInstagramField(e.target.value)}  
                                    >
                                    </input>
                                </div>

                                <div className="edit-profile-input-group">
                                    <label htmlFor="profile-facebook">Facebook:</label>
                                    <input
                                        type="text"
                                        id="profile-facebook"
                                        placeholder="Enter your Facebook username"
                                        value={userFacebookField === null ? '' : userFacebookField}
                                        onChange={e => setUserFacebookField(e.target.value)}
                                    >
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
        </div>
    );
}