import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { checkAuthentication } from '../../services/auth';
import { USER_KEY } from '../../utils/constants';
import { readCookie } from '../../utils/handlingCookies';

export default function PrivateRoute({component: Component, ...rest}) {
    const [authenticated, setAuthenticated] = useState(false);
    const [ready, setReady] = useState(false);
    const [id, setUserId] = useState(-1);

    useEffect(() => {
        const token = readCookie(USER_KEY);

        if(token) {
            const getAuthentication = async () => {
                await checkAuthentication().then(response => {
                    if(response.success) {
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
                <Component {...props} userId={id} />
                    :
                <Redirect to="/signin" />
        )} />
    );
}