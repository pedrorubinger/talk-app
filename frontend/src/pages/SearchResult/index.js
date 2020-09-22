import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { IoMdPersonAdd } from 'react-icons/io';

import './styles.css';
import defaultAvatarImg from '../../assets/profile-default.jpg';
import { SearchPepopleBar } from '../../components/SearchPeopleBar';

export function SearchResult() {
    const history = useHistory();

    if(history.location.state === undefined)
        return <Redirect to="/profile/me" />;

    const result = history.location.state.searchData;

    return(
        <div id="search-result-container">
            <SearchPepopleBar showProfile={true} />

            <h2>
                We found {result.length} {result.length === 1 ? ' result ' : ' results '}
                for your search for <i>{result.searchFilter}</i>.
            </h2>

            <div id="search-result-content">
                {
                    result.length === 0 ?
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
                        result.map(item => {
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
                                            
                                            <button
                                                className="btn-search-result-add"
                                                title="Send friend request"
                                            >
                                                <IoMdPersonAdd size="14" />
                                                <span>Add</span>
                                            </button>
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