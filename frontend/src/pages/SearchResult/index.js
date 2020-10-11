import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import './styles.css';

import { SearchPepopleBar } from '../../components/SearchPeopleBar';
import { api } from '../../services/api';
import { useUserContext } from '../../context/UserContext';
import { useFriendRequestContext } from '../../context/FriendRequestContext';
import FriendRequestList from '../../components/FriendRequestList';

export function SearchResult() {
    const history = useHistory();
    const [mounted, setMount] = useState(false);
    const [resultList, setResultList] = useState([]);
    const { userId } = useUserContext();
    const { recipientRequestId } = useFriendRequestContext();

    useEffect(() => {
        const getRequests = async () => {
            const requestsList = await api.get('/api/friendship/request/' + userId)
                .then(res => {
                    if(res.data.success) return res.data.results
                })
                .catch(error => {
                    if(error.response.status === 404) return [];
                    else console.log(error);
                    // implement error handling...
                });

            await getContacts(requestsList);
        }

        const getContacts = async (requestsList) => {
            let contactsList = [];

            await api.get('/api/contacts/' + userId)
                .then(res => {
                    if(res.data.success) contactsList = res.data.results;
                })
                .catch(error => {
                    if(error.response.status === 404) contactsList = [];
                    else console.log(error.response.data);
                });

                if(history.location.state === undefined) return;

                const contactExists = username => contactsList.some(contact => contact.user_nick === username);
                const friendRequestExists = id => requestsList.some(request => request.req_recipient_id === id);
                const pendingRequest = id => {
                    for(let request of requestsList) {
                        if(request.req_recipient_id === userId && request.user_id === id)
                            return request.req_recipient_id;
                    }
                }

                let result = history.location.state.searchData.filter(user => user.user_id !== userId);

                await result.map(item => {
                    if(contactExists(item.user_nick)) item.isContact = true;
                    else item.isContact = false;

                    if(friendRequestExists(item.user_id)) item.requestExists = true;
                    else item.requestExists = false;

                    const pending = pendingRequest(item.user_id);

                    if(pending) { 
                        item.pendingRequest = true;
                        item.req_recipient_id = pending;
                    } else item.pedingRequest = false;
                });

                setResultList(result);
                setMount(true);
        }

        getRequests();
    }, [(history.location.state ? history.location.state.searchData : [])]);

    if(history.location.state === undefined)
        return <Redirect to="/profile/me" />;

    if(!mounted)
        return <h2>Please wait, page is loading...</h2>

    return(
        <div id="search-result-container">
            <SearchPepopleBar showProfile={true} />

            <h2>
                We found {resultList.length} {resultList.length === 1 ? ' result ' : ' results '}
                for your search for <i>{history.location.state.searchFilter}</i>.
            </h2>

            <div id="search-result-content">
                {
                    resultList.length === 0 ?
                        <div className="search-user-not-found">
                            <p>
                                We are sorry but we did not find
                                any user for your search.
                            </p>

                            <p>
                                Please make sure you typed the name 
                                or username correctly and try again.
                            </p>
                        </div>
                    :
                        resultList.map(item => {
                            if(item.pendingRequest)
                                item.friend_request_status = 'pending';
                            else if(!item.isContact && !item.requestExists && item.user_id !== recipientRequestId)
                                item.friend_request_status = 'add';
                            else if((item.requestExists || item.user_id === recipientRequestId) && !item.isContact)
                                item.friend_request_status = 'sent';
                            else
                                item.friend_request_status = 'friends';

                            return <FriendRequestList key={item.user_id} item={item} />
                    })
                }
            </div>
        </div>
    );
}