import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

import './styles.css';
// import defaultAvatarImg from '../../assets/profile-default.jpg';
import { api } from '../../services/api';
import { useUserContext } from '../../context/UserContext';

export default function Contacts() {
    const [contactsList, setContactsList] = useState([]);
    const { userId } = useUserContext();

    useEffect(() => {
        const getContacts = async () => {
            await api.get('/api/contacts/' + userId)
                .then(res => {
                    setContactsList(res.data.results);
                })
                .catch(error => {
                    console.log(error);
                    if(error.response.status === 404)
                        setContactsList([]);
                });
        }

        getContacts();
    }, []);

    return(
        <div id="contacts-content">
            <h2>Contacts</h2>
            
            <div id="profile-contacts-list">
                {/* {
                    // FAKE DATA...
                    contactsList ?
                        <p className="nothing-found-message">You don't have any contacts yet.</p>
                    :
                        <ul>
                            <li>
                                <img src={defaultAvatarImg} height="40" width="40" alt="avatar"/>
                                
                                <div className="profile-contacts-info-group">
                                    <Link to="/">Vitinho</Link>
                                    <p>online</p>
                                </div>
                            </li>
                        </ul>
                } */}
                <p className="nothing-found-message">You don't have any contacts yet.</p>
            </div>
        </div>
    )
}