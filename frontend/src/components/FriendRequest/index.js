import React, { useEffect, useState } from 'react';

import './styles.css';

import { api } from '../../services/api';
import { useUserContext } from '../../context/UserContext';
import FriendRequestList from '../FriendRequestList';

export function FriendRequest() {
    const [resultList, setResultList] = useState([]);
    const [mounted, setMount] = useState(false);
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
            setMount(true);
        }

        getRequests();
    }, []);

    if(!mounted) {
        return(
            <div id="friend-request-container">
                <h2>Friend Requests</h2>
                <p className="nothing-found-message">Loading friend requests...</p>
            </div>
        );
    }

    return(
        <div id="friend-request-container">
            <h2>Friend Requests</h2>

            <div id="friend-request-content">
                {
                    resultList.length === 0 ?
                        <p className="nothing-found-message">You don't have any friend requests yet.</p>
                    :
                        resultList.map(item => {
                            item.friend_request_status = 'pending';

                            return <FriendRequestList key={item.user_id} item={item} />
                        })
                }
            </div>
        </div>
    );
}