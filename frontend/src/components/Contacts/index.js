import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import defaultAvatarImg from '../../assets/profile-default.jpg';

import { useUserContext } from '../../context/UserContext';
import { getContacts } from '../../utils/getContacts';

export default function Contacts() {
    const [mounted, setMount] = useState(false);
    const { userId, contactsList, setContactsList } = useUserContext();

    useEffect(() => {
        const getList = async () => {
            const list = await getContacts(userId);

            setContactsList(list);
        }

        getList();
        setMount(true);
    }, []);

    if(!mounted) {
        return(
            <div id="contacts-content">
                <h2>Contacts</h2>
                <p className="nothing-found-message">Loading your contacts...</p>
            </div>
        );
    }

    return(
        <div id="contacts-content">
            <h2>Contacts</h2>
            
            <div id="profile-contacts-list">
                {
                    contactsList.length === 0 ?
                        <p className="nothing-found-message">You don't have any contacts yet.</p>
                    :
                        <ul>
                            {
                                contactsList.map(item => {
                                    return(
                                        <li key={item.user_id}>
                                            <img src={defaultAvatarImg} height="40" width="40" alt="avatar"/>
                                            
                                            <div className="profile-contacts-info-group">
                                                <Link to="/">{item.user_name}</Link>
                                                <p>offline</p>
                                            </div>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                }
            </div>
        </div>
    )
}