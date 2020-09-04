const express = require('express');
const routes = express.Router();

const Authentication = require('./authentication/checkAuthentication');
const UserController = require('./controllers/UserController');

// USER AUTHENTICATION
routes.post('/api/auth/validate', Authentication.checkUserAuthentication);

// USER CONTROLLER
routes.post('/api/user/signup', UserController.signUp);
routes.post('/api/user/signin', UserController.signIn);

module.exports = routes;