import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { MdDelete } from 'react-icons/md';

import './styles.css';
import defaultAvatarImg from '../../assets/profile-default.jpg';

import { useUserContext } from '../../context/UserContext';
import { getContacts } from '../../utils/getContacts';
import { api } from '../../services/api';

export default function Contacts() {
    const [mounted, setMount] = useState(false);
    const { userId, contactsList, setContactsList } = useUserContext();

    const getContactsList = async () => {
        const list = await getContacts(userId);

        setContactsList(list);
    }

    useEffect(() => {
        const getList = async () => await getContactsList();

        getList();
        setMount(true);
    }, []);

    const handleClickDeleteContact = async contactId => {
        swal({
            title: "Are you sure?",
            text: "Are you sure do you want to delete this contact?",
            icon: "warning",
            buttons: ["Cancel", "Delete contact"],
            dangerMode: false,
        })
        .then(async willConfirm => {
            if(willConfirm) {
                try {
                    // const res = await api.delete('/api/contacts/delete/' + userId + '&' + contactId);
                    const res = await api.delete(`/api/contacts/delete/${userId}&${contactId}`);

                    if(res.data.success) {
                        await getContactsList();

                        swal({
                            title: "SUCCESS!",
                            text: "The contact was deleted!",
                            icon: "success",
                            buttons: "Gotcha!"
                        })
                    }
                } catch(err) {
                    swal({
                        title: "ERROR!",
                        text: "An error has occurred and the contact was not deleted!",
                        icon: "error",
                        buttons: "Gotcha!"
                    });
                    
                    console.log("Error", err);
                }
            }
        });
    }

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

                                            <div className="profile-contacts-info-container">
                                                <div className="profile-contacts-info-group">
                                                    <Link to="/">{item.user_name}</Link>
                                                    <p>offline</p>
                                                </div>

                                                <MdDelete
                                                    className="delete-icon"
                                                    size="20"
                                                    onClick={evt => {
                                                        evt.preventDefault();
                                                        handleClickDeleteContact(item.user_id);
                                                    }}
                                                    title="Delete contact"
                                                />
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