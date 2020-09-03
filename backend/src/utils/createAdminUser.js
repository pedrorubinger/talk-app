const connection = require('../config/connection');
const bcrypt = require('bcrypt');

async function createAdminUser() {
    // Encrypts the password
    const password = "pass";
    const hashedPassword = await bcrypt.hash(password, 10);

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

    const user_name = "Pedro Rubinger";
    const user_nick = "Pedro";
    const user_email = "pedro@mail.com";
    const user_permissions = 'admin';
    const user_last_visit = year + "-" + month + "-" + day + " " + now.toLocaleTimeString();
    const user_instagram_account = null;
    const user_facebook_account = null;

    const sqlArgs = [
        user_name,
        user_nick,
        user_email,
        hashedPassword,
        user_permissions,
        user_last_visit,
        user_instagram_account,
        user_facebook_account
    ];

    await connection.query(sqlCreateUser, sqlArgs, (err, results, fields) => {
        if(err) {
            console.log("Error when registering new user: " + err);
            return;
        }

        console.log("The admin user was successfully created.");
    });
}

module.exports = createAdminUser;