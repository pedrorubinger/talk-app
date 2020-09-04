const connection = require('../config/connection');
const jwt = require('jsonwebtoken');
const secKey = require('../config/secret.json');

module.exports = {
    // This function verifies whether a user token is valid.
    async checkUserAuthentication(request, response, next) {
        let token = request.body.authToken;

        if(!token)
            return response.status(401).send({ auth: false, message: "No token provided!" });

        await jwt.verify(token, secKey.secret, async (err, decoded) => {
            if(err)
                return response.status(500).send({ auth: false, message: "Failed to authenticate token!" });

            const sqlGetUsername = "SELECT user_nick FROM user WHERE user_id = ?";
            
            await connection.query(sqlGetUsername, [decoded.user_id], (err, results, fields) => {
                if(err) {
                    return response.status(500).send({
                        auth: false,
                        message: "Failed to get username!"
                    });
                }

                return response.status(200).send({
                    success: true,
                    user_id: decoded.user_id,
                    user_nick: results[0].user_nick
                });
            });
        });
    },

    // This function verifies whether a request is authorized to proceed.
    async checkRequestAuthentication(request, response, next) {
        let token = request.headers['x-access-token'];

        if(!token)
            return response.status(401).send({
                auth: false,
                message: "No token provided!"
            });

        await jwt.verify(token, secKey.secret, (err, decoded) => {
            if(err) {
                return response.status(500).send({
                    auth: false,
                    message: "Failed to authenticate token!"
                });
            }
            
            request.user_id = decoded.user_id;
            next();
        });
    }
}