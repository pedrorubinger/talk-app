import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

import { checkAuthentication } from '../../services/auth';
import { getUserData } from '../../services/getUserData';
import { USER_KEY } from '../../utils/constants';
import { readCookie } from '../../utils/handlingCookies';

export default function PrivateRoute({component: Component, ...rest}) {
    const [authenticated, setAuthenticated] = useState(false);
    const [ready, setReady] = useState(false);
    const { setUserId, setUserProfileData } = useUserContext();

    const getProfileData = async id => {
        const result = await getUserData(id);

        if(result.success) {
            setUserProfileData({
                name: result.name,
                nick: result.nick,
                email: result.email,
                userLastVisit: result.userLastVisit,
                facebook: result.facebook,
                instagram: result.instagram,
                location: result.location,
                bio: result.bio
            });

            return true;
        }
        
        setUserProfileData({});

        return false;
    }

    useEffect(() => {
        const token = readCookie(USER_KEY);

        if(token) {
            const getAuthentication = async () => {
                await checkAuthentication().then(async response => {
                    if(response.success && await getProfileData(response.user_id)) {
                        setAuthenticated(true);
                        setUserId(response.user_id);
                        setReady(true);
                    }
                    else {
                        setAuthenticated(false);
                        setReady(true);
                    }
                }).catch(err => {
                    console.log(err);
                    setReady(true);
                });
            }
    
            getAuthentication();
        } else
            setReady(true);
    }, []);

    if(!ready)
        return <h2>Please wait. The page is loading...</h2> 

    return(
        <Route {...rest} render={props => (
            authenticated ?
                <Component {...props} />
                    :
                <Redirect to="/signin" />
        )} />
    );
}