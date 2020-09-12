const express = require('express');
const routes = express.Router();

const Authentication = require('./authentication/checkAuthentication');
const UserController = require('./controllers/UserController');

// REQUEST AUTHENTICATION
const checkRequestAuthentication = Authentication.checkRequestAuthentication;

// USER AUTHENTICATION
routes.post('/api/auth/validate', Authentication.checkUserAuthentication);

// USER CONTROLLER
routes.post('/api/user/signup', UserController.signUp);
routes.post('/api/user/signin', UserController.signIn);
routes.get('/api/user/get/email/:user_email', UserController.checkEmail);
routes.get('/api/user/get/nick/:user_nick', UserController.checkNick);
routes.get('/api/user/get/id/:user_id', checkRequestAuthentication, UserController.getById);
routes.put('/api/user/profile/update/', UserController.update);

module.exports = routes;