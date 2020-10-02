import React from 'react';
import { IoMdPersonAdd } from 'react-icons/io';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import './styles.css';
import { api } from '../../services/api';
import defaultAvatarImg from '../../assets/profile-default.jpg';
import { useUserContext } from '../../context/UserContext';
import { useFriendRequestContext } from '../../context/FriendRequestContext';

export default function FriendRequestList(props) {
    const { item, label } = props;
    const { setRecipientRequestId } = useFriendRequestContext();
    const { userId } = useUserContext();

    const sendAddRequest = async (event, id) => {
        event.preventDefault();

        const data = {
            req_recipient_id: id,
            user_id: userId
        };

        await api.post('/api/friendship/request/', data)
            .then(res => {
                if(res.data.success)
                    setRecipientRequestId(id);
            })
            .catch(error => {
                setRecipientRequestId(-1);
                console.log(error.data);
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
                        label === 'pending' ?
                            <div className="pending-request-buttons-box">
                                <button
                                    className="accept-request-button"
                                    title={`Accept ${item.user_name}'s friend request`}
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
                        : label === 'add' ?
                            <button
                                className="btn-search-result-add"
                                title="Send friend request"
                                onClick={async event => sendAddRequest(event, item.user_id)}
                            >
                                <IoMdPersonAdd size="14" />
                                <span>Add</span>
                            </button>
                        : label === 'sent' ?
                            <span className="contact-request-sent">
                                Request sent
                                <AiOutlineCheckCircle size="19" />
                            </span>
                        : label === 'friends' ?
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