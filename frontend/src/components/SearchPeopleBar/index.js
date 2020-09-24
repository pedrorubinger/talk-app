import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BsFillChatSquareFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

import { api } from '../../services/api';
import './styles.css';

export function SearchPepopleBar(props) {
    const { showProfile } = props;
    const history = useHistory();

    const findPeople = async event => {
        event.preventDefault();

        const content = document.getElementById('search-people-input').value;

        // Need to implement validation...
        if(!content)
            return;

        const res = await api.get('/api/user/search/' + content)
            .then(response => {
                if(response.data.success)
                    return response.data.results;
            })
            .catch(error => {
                if(error.response.status === 404)
                    return error.response.data.results;
                // else implements some error message to be displayed...
            });

        history.push({
            pathname: '/search/',
            state: { searchData: res, searchFilter: content }
        });
    }

    return(
        <div id="search-people-bar-container">
            <div id="search-people-bar-home-links">
                <Link to="/" >
                    <AiFillHome size="15" color="#fff" style={{ marginRight: '8px' }} />
                    <span title="Click to back to home page">Home</span>
                </Link>

                {
                    showProfile ?
                        <Link to="/profile/me">
                            <FaUser size="15" color="#fff" style={{ marginRight: '8px' }} />
                            <span title="Click to back to your profile page">Profile</span>
                        </Link> : ''
                }

                <Link to="/chat">
                    <BsFillChatSquareFill size="15" color="#fff" style={{ marginRight: '8px' }} />
                    <span title="Click to get chat access">Chat</span>
                </Link>
            </div>

            <form id="search-people-input-button-box" onSubmit={findPeople}>
                <input
                    type="text"
                    id="search-people-input"
                    placeholder="Find your friends..."
                    maxLength="45"
                    autoFocus
                >
                </input>

                <button
                    id="search-people-button"
                    title="Find your friends"
                    type="submit"
                >
                    Find
                </button>
            </form>
        </div>
    );
}