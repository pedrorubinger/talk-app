const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');

// USER CONTROLLER
routes.post('/api/user/signup', UserController.signUp);
routes.post('/api/user/signin', UserController.signIn);

module.exports = routes;