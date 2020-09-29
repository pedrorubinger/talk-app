import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { IoMdPersonAdd } from 'react-icons/io';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import './styles.css';
import defaultAvatarImg from '../../assets/profile-default.jpg';
import { SearchPepopleBar } from '../../components/SearchPeopleBar';
import { api } from '../../services/api';
import { useUserContext } from '../../context/UserContext';

export function SearchResult() {
    const history = useHistory();
    const [mounted, setMount] = useState(false);
    const [recipientRequestId, setRecipientRequestId] = useState(-1);
    const [contactsList, setContactsList] = useState([]);
    const [resultList, setResultList] = useState([]);
    const { userId } = useUserContext();

    useEffect(() => {
        const getRequests = async () => {
            const requestsList = await api.get('/api/friendship/request/' + userId)
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

            await getContacts(requestsList);
        } 

        const getContacts = async (requestsList) => {
            await api.get('/api/contacts/' + userId)
                .then(res => {
                    if(res.data.success)
                        setContactsList(res.data.results);
                })
                .catch(error => {
                    if(error.response.status === 404)
                        setContactsList([]);
                    else
                        console.log(error.response.data);
                });

                if(history.location.state === undefined)
                    return;

                const contactExists = id => {
                    return contactsList.some(contact => contact.user_id === id)
                }

                const friendRequestExists = id => {
                    return requestsList.some(request => request.req_recipient_id === id);
                }

                const pendingRequest = () => {
                    return requestsList.some(request => request.req_recipient_id === userId);
                }

                let result = history.location.state.searchData.filter(user => user.user_id !== userId);

                await result.map(item => {
                    if(contactExists(item.user_id))
                        item.isContact = true;
                    else
                        item.isContact = false;

                    if(friendRequestExists(item.user_id))
                        item.requestExists = true;
                    else
                        item.requestExists = false;

                    if(pendingRequest())
                        item.pendingRequest = true;
                    else
                        item.pedingRequest = false;
                });

                setResultList(result);
                setMount(true);
        }

        getRequests();
    }, [history.location.state ? history.location.state.searchData : []]);

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
                                            
                                            {
                                                item.pendingRequest ?
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
                                                
                                                : !item.isContact && !item.requestExists && item.user_id !== recipientRequestId ?
                                                    <button
                                                        className="btn-search-result-add"
                                                        title="Send friend request"
                                                        onClick={async event => sendAddRequest(event, item.user_id)}
                                                    >
                                                        <IoMdPersonAdd size="14" />
                                                        <span>Add</span>
                                                    </button>
                                                : item.requestExists || item.user_id === recipientRequestId ?
                                                    <span className="contact-request-sent">
                                                        Request sent
                                                        <AiOutlineCheckCircle size="19" />
                                                    </span>
                                                :
                                                    <span className="contact-request-sent">
                                                        Friends
                                                        <AiOutlineCheckCircle size="19" />
                                                    </span>
                                            }
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