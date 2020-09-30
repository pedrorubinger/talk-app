import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { api } from '../../services/api';

import './styles.css';
import defaultAvatarImg from '../../assets/profile-default.jpg';

export function FriendRequest() {
    const [resultList, setResultList] = useState([]);
    const { userId } = useUserContext();

    useEffect(() => {
        const getRequests = async () => {
            const requestsList = await api.get('/api/friendship/request/user/' + userId)
                .then(res => {
                    if(res.data.success)
                        return res.data.results
                })
                .catch(error => {
                    if(error.response.status === 404)
                        return [];
                    else
                        console.log(error);
                        // implement error handling...
                });

            setResultList(requestsList);
        } 

        getRequests();
    }, []);

    return(
        <div id="friend-request-container">
            <h2>Friend Requests</h2>

            <div id="friend-request-content">
                {
                    resultList.length === 0 ?
                    <p className="nothing-found-message">You don't have any friend requests yet.</p>
                    :
                    resultList.map(item => {
                        return(
                            <div key={item.user_id} className="search-result-card-item">
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
                                    </div>

                                    <p>@{item.user_nick}</p>
                                    <p>{item.user_location || 'Unknown location'}</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}