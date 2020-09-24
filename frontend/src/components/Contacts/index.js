import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import defaultAvatarImg from '../../assets/profile-default.jpg';
import { api } from '../../services/api';

export default function Contacts(props) {
    const [contactsList, setContactsList] = useState([]);

    useEffect(() => {
        const getContacts = async () => {
            await api.get('/api/contacts/' + props.userId)
                .then(res => {
                    contactsList(res.data.results);
                })
                .catch(error => {
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
                {
                    contactsList ?
                        <p className="no-contacts-message">This user has no contacts.</p>
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
                }
            </div>
        </div>
    )
}