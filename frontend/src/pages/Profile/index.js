import React from 'react';

import './styles.css';

import { SearchPepopleBar } from '../../components/SearchPeopleBar';
import { FriendRequest } from '../../components/FriendRequest';
import PersonalInformation from '../../components/PersonalInformation';
import Contacts from '../../components/Contacts';
import AccountEditing from '../../components/AccountEditing';

export function Profile() {
    return(
        <div id="profile-container">
            <SearchPepopleBar />
            <div id="prof-content">
                <div id="profile-content-group-1">
                    <Contacts />
                    <FriendRequest />
                </div>

                <div id="profile-content-group-2">
                    <PersonalInformation />
                    <AccountEditing />
                </div>
            </div>
        </div>
    );
}