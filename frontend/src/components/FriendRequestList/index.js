import React, { useState } from 'react';
import { IoMdPersonAdd } from 'react-icons/io';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import './styles.css';
import defaultAvatarImg from '../../assets/profile-default.jpg';

import { api } from '../../services/api';
import { useUserContext } from '../../context/UserContext';
import { useFriendRequestContext } from '../../context/FriendRequestContext';
import { getContacts } from '../../utils/getContacts';

export default function FriendRequestList(props) {
    const { item } = props;
    const { setRecipientRequestId } = useFriendRequestContext();
    const { userId, setContactsList } = useUserContext();
    const [friend, setFriend] = useState(-1);

    const acceptFriendRequest = async (event, user_id, req_recipient_id) => {
        event.preventDefault();

        const data = { user_id: user_id, contact_id: req_recipient_id };

        await api.post('/api/contacts/', data)
            .then(response => {
                if(response.data.success) {
                    getContacts(userId)
                        .then(list => setContactsList(list))
                        .catch(error => console.log(error)); // implements error handling...

                    setFriend(req_recipient_id);
                }
            })
            .catch(error => {
                console.log(error);
                // implements error handling...
            });
    }

    const sendAddRequest = async (event, id) => {
        event.preventDefault();

        const data = { req_recipient_id: id, user_id: userId };

        await api.post('/api/friendship/request/', data)
            .then(res => {
                if(res.data.success) {
                    item.friend_request_status = 'sent';

                    setRecipientRequestId(id);
                }
            })
            .catch(error => {
                setRecipientRequestId(-1);

                console.log(error.data);
                // implements error handling...
            });
    }

    return(
        <div className="search-result-card-item">
            <img
                src={item.user_image || defaultAvatarImg}
                height="80"
                width="80"
                alt="profile"
            />

            <div className="search-result-card-item-info">
                <div className="search-result-card-item-title">
                    <p>
                        <strong>{item.user_name}</strong>
                    </p>

                    {
                        item.friend_request_status === 'pending' && friend === -1 ?
                            <div className="pending-request-buttons-box">
                                <button
                                    className="accept-request-button"
                                    title={`Accept ${item.user_name}'s friend request`}
                                    onClick={event => acceptFriendRequest(event, item.user_id, item.req_recipient_id)}
                                >
                                    Accept
                                </button>

                                <button
                                    className="reject-request-button"
                                    title={`Reject ${item.user_name}'s friend request`}
                                >
                                    Reject
                                </button>
                            </div>
                        : item.friend_request_status === 'add' ?
                            <button
                                className="btn-search-result-add"
                                title="Send friend request"
                                onClick={async event => sendAddRequest(event, item.user_id)}
                            >
                                <IoMdPersonAdd size="14" />
                                <span>Add</span>
                            </button>
                        : item.friend_request_status === 'sent' ?
                            <span className="contact-request-sent">
                                Request sent
                                <AiOutlineCheckCircle size="19" />
                            </span>
                        : item.friend_request_status === 'friends' || friend === item.req_recipient_id ?
                            <span className="contact-request-sent">
                                Friends
                                <AiOutlineCheckCircle size="19" />
                            </span>
                        : ''
                    }
                </div>

                <p>@{item.user_nick}</p>
                <p>{item.user_location || 'Unknown location'}</p>
            </div>
        </div>
    );
}