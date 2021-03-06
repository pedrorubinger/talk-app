import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { MdErrorOutline } from 'react-icons/md';

import './styles.css';
import { validatesProfileData } from '../../utils/dataValidation';
import { api } from '../../services/api';
import { useUserContext } from '../../context/UserContext';

export default function AccountEditing() {
    // Component did mount
    const [ready, setReady] = useState(false);
    // Input data
    const [currentUserPasswordField, setCurrentUserPasswordField] = useState('');
    const [newUserPasswordField, setNewUserPasswordField] = useState('');
    const [userNameField, setUsernameField] = useState('');
    const [userEmailField, setUserEmailField] = useState('');
    const [userInstagramField, setUserInstagramField] = useState('');
    const [userFacebookField, setUserFacebookField] = useState('');
    const [userBioField, setUserBioField] = useState('');
    const [userLocationField, setUserLocationField] = useState('');
    // Data validation
    const [invalidAccountEditingDataMessage, setInvalidAccountEditingDataMessage] = useState('');
    // Buttons and form visibility
    const [saveChangesProccess, setSaveLoading] = useState(false);
    const [buttonsAreDisabled, setDisableButtons] = useState(false);
    // UserContext
    const { userId, userProfileData } = useUserContext();

    useEffect(() => {
        setUsernameField(userProfileData.name);
        setUserEmailField(userProfileData.email);
        setUserInstagramField(userProfileData.instagram);
        setUserFacebookField(userProfileData.facebook);
        setUserBioField(userProfileData.bio);
        setUserLocationField(userProfileData.location);
        setReady(true);
    }, []);

    const showInvalidInput = (fields = []) => {
        let usernameInput = document.getElementById('profile-name');
        let emailInput = document.getElementById('profile-email');
        let currentPasswordInput = document.getElementById('profile-current-password');
        let newPasswordInput = document.getElementById('profile-new-password');
        let facebookInput = document.getElementById('profile-facebook');
        let instagramInput = document.getElementById('profile-instagram');
        let locationInput = document.getElementById('profile-location');
        let bioInput = document.getElementById('profile-bio');

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

        if(fields.indexOf('location') === -1)
            locationInput.style.border = '1px solid rgb(170, 170, 170)';
        else
            locationInput.style.border = '1px solid red';

        if(fields.indexOf('bio') === -1)
            bioInput.style.border = '1px solid rgb(170, 170, 170)';
        else
            bioInput.style.border = '1px solid red';
    }

    const updateProfile = async data => {
        return await api.put('/api/user/profile/update/', data).then(response => {
            if(response.status === 200)
                return true;
        }).catch(() => false);
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
            } else
                return { success: false, invalidField: 'error', message: 'An internal error has occurred!' };
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
        } = await validatesProfileData(
                userNameField,
                userEmailField,
                currentUserPasswordField, 
                newUserPasswordField, 
                userInstagramField,
                userFacebookField,
                userLocationField,
                userBioField
            );

        if(invalidFields.length > 0) {
            const messages = [
                    (hasEmptyField ? 'You must complete all required fields (*)!' : ''),
                    (hasNotAllowedChars ? 'You must use only allowed characters and respect the maximum size!' : '')
            ];

            setInvalidAccountEditingDataMessage(messages);
            showInvalidInput(invalidFields);
            setDisableButtons(true);
        } else {
            showInvalidInput('valid');

            const data = {
                user_nick: userProfileData.nick,
                user_password: currentUserPasswordField
            };

            const passwordIsValid = await api.post('/api/user/signin', data)
                .then(response => response.data.success)
                .catch(() => false);

            if(passwordIsValid) {
                const data = {
                    user_name: userNameField,
                    user_nick: userProfileData.nick,
                    user_password: password,
                    user_email: userEmailField,
                    user_instagram_account: (userInstagramField === '' ? null : userInstagramField),
                    user_facebook_account: (userFacebookField === '' ? null : userFacebookField),
                    user_location: (userLocationField === '' ? null : userLocationField),
                    user_bio: (userBioField === '' ? null : userBioField),
                    user_id: userId
                }

                if(userEmailField !== userProfileData.email) {
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
                        }).then(() => window.location.reload());
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
                        }).then(() =>  window.location.reload());
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
        return <h2>Please wait. The page is loading...</h2>

    return(
        <div id="account-editing-container">
            <h2>Account Editing</h2>
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

            <div id="profile-personal-edit-box">
                <div className="edit-profile-field-group" id="edit-profile-group-1">
                    <div className="edit-profile-input-group">
                        <label htmlFor="profile-name">
                            Name <span style={{ color: 'red' }}>*</span>
                        </label>

                        <input
                            type="text"
                            id="profile-name"
                            placeholder="Enter your name"
                            value={userNameField}
                            maxLength="20"
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
                            maxLength="40"
                            onChange={e => setUserEmailField(e.target.value)}
                        >
                        </input>
                    </div>
                </div>

                <div className="edit-profile-field-group" id="edit-profile-group-2">
                    <div className="edit-profile-input-group">
                        <label htmlFor="profile-current-password">
                            Current Password <span style={{ color: 'red' }}>*</span>
                        </label>

                        <input
                            type="password"
                            id="profile-current-password"
                            placeholder="Enter your current password"
                            maxLength="20"
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
                            maxLength="20"
                            onChange={e => setNewUserPasswordField(e.target.value)}
                        >
                        </input>
                    </div>
                </div>

                <div className="edit-profile-field-group" id="edit-profile-group-3">
                    <div className="edit-profile-input-group">
                        <label htmlFor="profile-instagram">Instagram:</label>

                        <input
                            type="text"
                            id="profile-instagram"
                            placeholder="Enter your Instagram username"
                            value={userInstagramField === null ? '' : userInstagramField}
                            maxLength="30"
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
                            maxLength="30"
                            onChange={e => setUserFacebookField(e.target.value)}
                        >
                        </input>
                    </div>
                </div>

                <div className="edit-profile-field-group" id="edit-profile-group-4">
                    <div className="edit-profile-input-group">
                            <label htmlFor="profile-bio">Bio:</label>
                            <input
                                type="text"
                                id="profile-bio"
                                placeholder="Enter your bio/status"
                                value={userBioField === null ? '' : userBioField}
                                maxLength="85"
                                onChange={e => setUserBioField(e.target.value)}
                            >
                            </input>
                    </div>

                    <div className="edit-profile-input-group">
                        <label htmlFor="profile-location">Location:</label>
                        <input
                            type="text"
                            id="profile-location"
                            placeholder="Enter your location"
                            value={userLocationField === null ? '' : userLocationField}
                            maxLength="45"
                            onChange={e => setUserLocationField(e.target.value)}
                        >
                        </input>
                    </div>
                </div>

                <button
                    id="edit-profile-save-button"
                    title="Save changes and update your profile"
                    onClick={submitAccountEditing}
                    disabled={buttonsAreDisabled}
                >
                    { saveChangesProccess ? "Saving..." : "Save Changes" }
                </button>
            </div>
        </div>
    );
}