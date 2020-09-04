import { USER_KEY, SERVER_BASE_URL } from '../utils/constants';
import { readCookie } from '../utils/handlingCookies';

const axios = require('axios');

export const api = axios.create({
    baseURL: SERVER_BASE_URL,
    headers: {
        'x-access-token': readCookie(USER_KEY)
    }
});

export const apiWithoutAuth = axios.create({
    baseURL: SERVER_BASE_URL
});