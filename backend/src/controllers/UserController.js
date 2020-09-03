const connection = require('../config/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secKey = require('../config/secret.json');
const validateData = require('../utils/validatesData');

module.exports = {
    async signUp(request, response) {
        if(!validateData.validatesUserData(request.body.user_name, request.body.user_nick,
            request.body.user_email, request.body.user_password)) {
            return response.status(400).send({
                success: false,
                code: 400,
                message: 'Invalid user data!'
            });
        }

        // Encrypts the password
        const hashedPassword = await bcrypt.hash(request.body.user_password, 10);

        // Gets the current date and time and formats them
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
                    code: 500,
                    message: "Error when registering new user: " + err
                });
            }

            return response.status(200).send({
                success: true,
                code: 200,
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
                code: 400,
                message: 'Invalid user data!'
            });
        }

        const sqlSignIn = "SELECT * FROM user WHERE BINARY user_nick = ?";

        await connection.query(sqlSignIn, [request.body.user_nick], async (err, results, fields) => {
            if(err) {
                return response.status(500).send({
                    success: false,
                    code: 500,
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
    }
}