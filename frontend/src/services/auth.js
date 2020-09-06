import { apiWithoutAuth } from './api';
import { readCookie, createCookie, eraseCookie } from '../utils/handlingCookies';
import { USER_KEY } from '../utils/constants';

export const checkAuthentication = async () => {
    const token = readCookie(USER_KEY);

    if(!token)
        return false;

    try {
        const response = await apiWithoutAuth.post('/api/auth/validate', { authToken: token });

        return response.data;
    } catch (err) {
        return false;
    }
}

export const sendLoginData = async (user_nick, user_password) => {
    try {
        const responseLogin = await apiWithoutAuth.post('/api/user/signin', { user_nick, user_password });
        
        if(responseLogin.data.success) {
            createCookie(USER_KEY, responseLogin.data.token, 0);
            return true;
        } else return false;
    } catch (err) {
        return false;
    }
}

export const sendSignUpData = async (user_name, user_nick, user_email, user_password) => {
    return await apiWithoutAuth.get('/api/user/get/email/' + user_email).then(response => {
        if(response.status == 200)
            return { success: false, invalidField: 'email', message: 'This email is already registered!' };
    }).catch(async error => {
        if(error.response.status == 404) {
            return await apiWithoutAuth.get('/api/user/get/nick/' + user_nick).then(response => {
                if(response.status == 200)
                    return { success: false, invalidField: 'username', message: 'This username is already registered!' };
            }).catch(async error => {
                if(error.response.status == 404) {
                    const data = { user_name, user_nick, user_email, user_password };

                    if(await registerNewUser(data))
                        return { success: true, message: 'The user has been registered!' };
                    else
                        return { success: false, invalidField: 'error', message: 'An unexpected error has occurred!' };
                }
            });
        }
    });
}

const registerNewUser = async data => {
    return await apiWithoutAuth.post('/api/user/signup', data).then(response => {
        if(response.status == 200)
            return true;
    }).catch(() => {
        return false;
    });
}

export const logout = () => {
    eraseCookie(USER_KEY);
    window.location.reload();
}