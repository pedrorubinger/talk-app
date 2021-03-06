import React from 'react';
import { AiFillFacebook } from 'react-icons/ai';
import { FiInstagram } from 'react-icons/fi';

import './styles.css';
import defaultAvatarImg from '../../assets/profile-default.jpg';

import { useUserContext } from '../../context/UserContext';

export default function PersonalInformation() {
    const { userProfileData } = useUserContext();

    return(
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
                    <h3>{userProfileData.name}</h3>

                    <p id="profile-bio-view">
                        <i>{userProfileData.bio || "Hey there! I'm using TalkApp!"}</i>
                    </p>

                    <p>
                        <b>Nick:</b>
                        &nbsp;&nbsp;{userProfileData.nick}
                    </p>

                    <p>
                        <b>Email:</b>
                        &nbsp;&nbsp;{userProfileData.email}
                    </p>

                    <p>
                        <b>Location:</b>
                        &nbsp;&nbsp;{userProfileData.location || 'Unknown location'}
                    </p>

                    <p>
                        <b>Last visit:</b>
                        &nbsp;&nbsp;
                        {
                            userProfileData.userLastVisit
                                .substring(0, 10)
                                .split('-')
                                .reverse()
                                .join('/') + ' ' + 
                                new Date(userProfileData.userLastVisit)
                                .toTimeString()
                                .substring(0, 5)
                        }
                    </p>

                    <p>
                        <b>Social:</b>&nbsp;&nbsp;
                        {
                            ((userProfileData.instagram === '' || userProfileData.instagram === null) &&
                            (userProfileData.facebook === '' || userProfileData.facebook === null)) ?
                            'Not included' : ''
                        }

                        {
                            ((userProfileData.instagram !== '' && userProfileData.instagram !== null)
                                && (userProfileData.facebook !== '' && userProfileData.facebook !== null)) ?
                            <span>
                                <a
                                    href={"https://www.instagram.com/" + (userProfileData.instagram || '')}
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    <FiInstagram color="black" size="18" />
                                </a>

                                &nbsp;
                                <a
                                    href={"https://www.facebook.com/" + (userProfileData.facebook || '')}
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    <AiFillFacebook color="black" size="18" />
                                </a>
                            </span>
                            :
                            userProfileData.instagram !== null && userProfileData.instagram !== '' ?
                                <a
                                    href={"https://www.instagram.com/" + (userProfileData.instagram || '')}
                                    target="_blank" rel="noopener noreferrer"    
                                >
                                    <FiInstagram color="black" size="18" />
                                </a>
                            :
                            userProfileData.facebook !== null && userProfileData.facebook !== '' ?
                                <a
                                    href={"https://www.facebook.com/" + (userProfileData.facebook || '')}
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    <AiFillFacebook color="black" size="18" />
                                </a> : ''
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}