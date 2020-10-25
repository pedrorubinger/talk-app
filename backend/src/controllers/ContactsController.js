const connection = require('../config/connection');

module.exports = {
    getById(request, response) {
        const { user_id } = request.params;

        const sqlGetAll = `
            SELECT u.user_id, user_name, user_nick
            FROM user u, contact c
            WHERE (c.user_id = u.user_id XOR c.contact_id = u.user_id) AND (c.user_id = ? XOR c.contact_id = ?) 
        `;

        connection.query(sqlGetAll, [user_id, user_id], (err, results, fields) => {
            if(err) {
                return response.status(500).send({
                    success: false,
                    message: "Error when get contacts: " + err
                });
            }

            if(results.length == 0 || results == null) {
                return response.status(404).send({
                    success: false,
                    message: "This user has no contact!",
                    results
                });
            }

            return response.status(200).send({
                success: true,
                message: "Contacts were found!",
                results
            });
        });
    },

    create(request, response) {
        const { user_id, contact_id } = request.body;

        connection.beginTransaction(err => {
            if(err) {
                return response.status(500).send({
                    success: false,
                    message: "Server error creating this contact: " + err
                });
            }

            const sqlDeleteFriendRequest = "DELETE FROM request WHERE user_id = ? AND req_recipient_id = ?";
            const sqlDeleteFriendRequestArgs = [user_id, contact_id];

            connection.query(sqlDeleteFriendRequest, sqlDeleteFriendRequestArgs, (err, results, fields) => {
                if(err) {
                    connection.rollback(() => {
                        throw err;
                    });
                }

                const sqlInsertContact = `
                    INSERT INTO contact(contact_id, contact_friendship_since, user_id)
                        VALUES(?, ?, ?);
                `;

                const now = new Date();
                const year = now.getFullYear();
                const month = (now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1));
                const day = (now.getDate() < 10 ? "0" + now.getDate() : now.getDate());
                const contact_friendship_since = year + "-" + month + "-" + day + " " + now.toLocaleTimeString();

                const sqlInsertContactArgs = [
                    contact_id,
                    contact_friendship_since,
                    user_id
                ];

                connection.query(sqlInsertContact, sqlInsertContactArgs, (err, results, fields) => {
                    if(err) {
                        connection.rollback(() => {
                            throw err;
                        });
                    }

                    connection.commit(err => {
                        if(err) {
                            connection.rollback(() => {
                                throw err;
                            });
                        }

                        return response.status(200).send({
                            success: true,
                            message: "The contact was successfully created!"
                        });
                    });
                });
            });
        });
    },

    delete(request, response) {
        const { user_id, contact_id } = request.params;
        const sqlDeleteContact = `
            DELETE FROM contact
            WHERE (user_id = ? and contact_id = ?) OR (user_id = ? AND contact_id = ?);
        `;
        const deleteContactArgs = [
            Number(user_id),
            Number(contact_id),
            Number(contact_id),
            Number(user_id),
        ];

        connection.query(sqlDeleteContact, deleteContactArgs, (err, results, fields) => {
            if(err) {
                return response.status(500).send({
                    success: false,
                    message: "Error when delete contacts: " + err
                });
            }

            return response.status(200).send({
                success: true,
                message: "The contact was successfully deleted!"
            });
        });
    }
}