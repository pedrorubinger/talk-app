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

export const logout = () => {
    eraseCookie(USER_KEY);
    window.location.reload();
}