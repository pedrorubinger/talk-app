const connection = require('../config/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secKey = require('../config/secret.json');
const validateData = require('../utils/validatesData');

const checkCredentials = async (user_nick, user_password) => {
    return new Promise((resolve, reject) => {
        const sqlSelectData = "SELECT * FROM user WHERE BINARY user_nick = ?";

        connection.query(sqlSelectData, [user_nick], async (err, results, fields) => {
            if(err) {
                reject({
                    success: false,
                    message: "Error trying to sign in: " + err
                });
            }

            if(results == null || results.length == 0) {
                reject({
                    success: false,
                    message: "Authentication failure!" // User not found
                });
            }
    
            const match = await bcrypt.compare(user_password, results[0].user_password);

            if(!match) {
                reject({
                    success: false,
                    message: "Unauthorized: Invalid username or password!"
                });
            } else {
                resolve({
                    success: true,
                    message: "Authorized: Valid username or password!"
                })
            }
        });
    });
}

module.exports = {
    async signUp(request, response) {
        if(!validateData.validatesUserData(request.body.user_name, request.body.user_nick,
            request.body.user_email, request.body.user_password)) {
            return response.status(400).send({
                success: false,
                message: 'Invalid user data!'
            });
        }

        // 1. Encrypts the password
        const hashedPassword = await bcrypt.hash(request.body.user_password, 10);

        // 2. Gets the current date and time and formats them
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1));
        const day = (now.getDate() < 10 ? "0" + now.getDate() : now.getDate());

        const sqlCreateUser = `
            INSERT INTO user(user_name, user_nick, user_email, user_password, user_permissions,
                user_last_visit, user_instagram_account, user_facebook_account)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)
            `;

        const user_permissions = 'normal';
        const user_last_visit = year + "-" + month + "-" + day + " " + now.toLocaleTimeString();
        const user_instagram_account = null;
        const user_facebook_account = null;

        const sqlArgs = [
            request.body.user_name,
            request.body.user_nick,
            request.body.user_email,
            hashedPassword,
            user_permissions,
            user_last_visit,
            user_instagram_account,
            user_facebook_account
        ];

        await connection.query(sqlCreateUser, sqlArgs, (err, results, fields) => {
            if(err) {
                return response.status(500).send({
                    success: false,
                    message: "Error when registering new user: " + err
                });
            }

            return response.status(200).send({
                success: true,
                message: "The user has been successfully registered!"
            });
        });
    },

    async signIn(request, response) {
        if(!request.body.user_nick || !request.body.user_password) {
            return response.status(400).send({
                success: false,
                message: "Invalid data! Enter username and password!"
            });
        }

        if(!validateData.validatesLoginData(request.body.user_nick, request.body.user_password)) {
            return response.status(400).send({
                success: false,
                message: 'Invalid user data!'
            });
        }

        const sqlSignIn = "SELECT * FROM user WHERE BINARY user_nick = ?";

        await connection.query(sqlSignIn, [request.body.user_nick], async (err, results, fields) => {
            if(err) {
                return response.status(500).send({
                    success: false,
                    message: "Error trying to sign in: " + err
                });
            }

            if(results == null || results.length == 0) {
                return response.status(401).send({
                    success: false,
                    message: "Authentication failure!" // User not found
                });
            }

            const match = await bcrypt.compare(request.body.user_password, results[0].user_password);

            if(!match) {
                return response.status(401).send({
                    success: false,
                    message: "Invalid username or password!"
                });
            }

            /* From here, the user is authenticated */
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1));
            const day = (now.getDate() < 10 ? "0" + now.getDate() : now.getDate());
            const user_last_visit = year + "-" + month + "-" + day + " " + now.toLocaleTimeString();
            const sqlUpdatesLastVisit = "UPDATE user SET user_last_visit = ? WHERE user_id = ?";
            
            connection.query(sqlUpdatesLastVisit, [user_last_visit, results[0].user_id], (err, results, fields) => {
                if(err) {
                    return response.status(500).send({
                        success: false,
                        message: "Error trying to sign in: " + err
                    });
                }
            });

            const userId = results[0].user_id;
            const nick = results[0].user_nick;
            const token = await jwt.sign({ user_id: userId }, secKey.secret, { expiresIn: 86400 });

            return response.status(200).send({
                user_id: userId,
                user_nick: nick,
                success: true,
                token,
            });
        });
    },

    getByNameOrNick(request, response) {
        const content = request.params.user_name;
        const sqlGetUsers = `
            SELECT user_id, user_name, user_nick, user_location, user_image
            FROM user
            WHERE user_name LIKE CONCAT('%', ?, '%')
                OR user_nick LIKE CONCAT('%', ?, '%');                
        `;

        connection.query(sqlGetUsers, [content, content], (err, results, fields) => {
            if(err) {
                return response.status(500).send({
                    success: false,
                    message: "An unexpected error has occurred!"
                });
            }

            if(results.length == 0 || results == null) {
                return response.status(404).send({
                    success: false,
                    message: "User not found!",
                    results
                });
            }

            return response.status(200).send({
                success: true,
                message: "User was found!",
                results
            });
        });
    },

    async checkEmail(request, response) {
        const sqlGetUserByEmail = "SELECT user_email FROM user WHERE user_email = ?";

        await connection.query(sqlGetUserByEmail, [request.params.user_email], async (err, results, fields) => {
            if(err) {
                return response.status(500).send({
                    success: false,
                    message: "An unexpected error has occurred!"
                });
            }

            if(results == null || results.length == 0) {
                return response.status(404).send({
                    success: false,
                    message: "The user was not found!"
                });
            }

            return response.status(200).send({
                success: true,
                nick: results[0].user_nick,
                email: results[0].user_email,
                message: "The user was found!"
            });
        });
    },

    async checkNick(request, response) {
        const sqlGetUserByNick = "SELECT user_nick FROM user WHERE user_nick = ?"

        await connection.query(sqlGetUserByNick, [request.params.user_nick], (err, results, fields) => {
            if(err) {
                return response.status(500).send({
                    success: false,
                    message: "An unexpected error has occurred!"
                });
            }

            if(results == null || results.length == 0) {
                return response.status(404).send({
                    success: true,
                    message: "User was not found!"
                });
            }

            return response.status(200).send({
                success: true,
                nick: results[0].user_nick,
                message: "User was found!"
            });
        });
    },

    async getById(request, response) {
        const sqlGetProfileData = `
            SELECT user_name,
                   user_nick,
                   user_email,
                   user_permissions,
                   user_last_visit,
                   user_instagram_account,
                   user_facebook_account
            FROM user
            WHERE user_id = ?
        `;

        await connection.query(sqlGetProfileData, [request.params.user_id], (err, results, fields) => {
            if(err) {
                return response.status(500).send({
                    success: false,
                    message: "An unexpected internal error has occurred!"
                });
            }

            if(results.length == 0 || results == null) {
                return response.status(404).send({
                    success: false,
                    message: "User was not found!"
                });
            }

            return response.status(200).send({
                success: true,
                name: results[0].user_name,
                nick: results[0].user_nick,
                email: results[0].user_email,
                permissions: results[0].user_permissions,
                last_visit: results[0].user_last_visit,
                instagram: results[0].user_instagram_account,
                facebook: results[0].user_facebook_account,
            });
        });
    },

    async update(request, response) {
        try {
            await checkCredentials(request.body.user_nick, request.body.user_password);
        } catch (error) {
            return response.status(401).send(error);
        }

        const sqlUpdateProfile = `
            UPDATE user
            SET user_name = ?,
                user_email = ?,
                user_password = ?,
                user_instagram_account = ?,
                user_facebook_account = ?
            WHERE user_id = ?
        `;

        const hashedPassword = await bcrypt.hash(request.body.user_password, 10);

        const updateProfileArgs = [
            request.body.user_name,
            request.body.user_email,
            hashedPassword,
            request.body.user_instagram_account,
            request.body.user_facebook_account,
            request.body.user_id
        ]

        await connection.query(sqlUpdateProfile, updateProfileArgs, (err, results, fields) => {
            if(err) {
                return response.status(500).send({
                    success: false,
                    message: "An unexpected internal error has occurred!"
                });
            }

            return response.status(200).send({
                success: true,   
                message: "Your profile was successfully updated!"
            });
        })
    }
}