const express = require('express');
const routes = express.Router();

const Authentication = require('./authentication/checkAuthentication');
const UserController = require('./controllers/UserController');
const ContactsController = require('./controllers/ContactsController');
const RequestsController = require('./controllers/RequestsController');

// REQUEST AUTHENTICATION
const checkRequestAuthentication = Authentication.checkRequestAuthentication;

// USER AUTHENTICATION
routes.post('/api/auth/validate', Authentication.checkUserAuthentication);

// USER CONTROLLER
routes.post('/api/user/signup', UserController.signUp);
routes.post('/api/user/signin', UserController.signIn);
routes.get('/api/user/search/:user_name', checkRequestAuthentication, UserController.getByNameOrNick);
routes.get('/api/user/get/email/:user_email', UserController.checkEmail);
routes.get('/api/user/get/nick/:user_nick', UserController.checkNick);
routes.get('/api/user/get/id/:user_id', checkRequestAuthentication, UserController.getById);
routes.put('/api/user/profile/update/', checkRequestAuthentication, UserController.update);

// CONTACTS CONTROLLER
routes.post('/api/contacts/', checkRequestAuthentication, ContactsController.create);
routes.get('/api/contacts/:user_id', checkRequestAuthentication, ContactsController.getById);

// REQUESTS CONTROLLER
routes.post('/api/friendship/request/', checkRequestAuthentication, RequestsController.create);
routes.get('/api/friendship/request/:user_id', checkRequestAuthentication, RequestsController.getById);
routes.get('/api/friendship/request/user/:user_id', checkRequestAuthentication, RequestsController.getByUserId);

module.exports = routes;