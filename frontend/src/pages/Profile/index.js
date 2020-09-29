import React, { useState } from 'react';

import './styles.css';
import { SearchPepopleBar } from '../../components/SearchPeopleBar';
import { FriendRequest } from '../../components/FriendRequest';
import PersonalInformation from '../../components/PersonalInformation';

export function Profile() {
    const [friendRequests, /*setFriendRequests */] = useState(false);

    // const showFriendRequests = () => {
        
    // }

    return(
        <div id="profile-container">
            <SearchPepopleBar />
            
            { friendRequests ? <FriendRequest /> : '' }
            
            <PersonalInformation />
        </div>
    );
}