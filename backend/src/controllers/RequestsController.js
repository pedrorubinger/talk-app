const connection = require('../config/connection');

module.exports = {
    create(request, response) {
        const sqlCreateRequest = `
            INSERT INTO request(req_recipient_id, user_id, req_created_at)
                VALUES(?,?,?);
        `;

        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1));
        const day = (now.getDate() < 10 ? "0" + now.getDate() : now.getDate());
        const req_created_at = year + "-" + month + "-" + day + " " + now.toLocaleTimeString();

        const sqlArgs = [
            request.body.req_recipient_id,
            request.body.user_id,
            req_created_at
        ];

        connection.query(sqlCreateRequest, sqlArgs, (err, results, fields) => {
            if(err) {
                return response.status(500).send({
                    success: false,
                    message: "Error creating request: " + err
                });
            }

            return response.status(200).send({
                success: true,
                message: "The request was made!"
            });
        });
    },

    getById(request, response) {
        const sqlGetRequests = "SELECT * FROM request WHERE user_id = ? OR req_recipient_id = ?";

        connection.query(sqlGetRequests, [request.params.user_id, request.params.user_id], (err, results, fields) => {
            if(err) {
                return response.status(500).send({
                    success: false,
                    message: "Error fetching requests: " + err
                });
            }

            if(results.length == 0 || results == null) {
                return response.status(404).send({
                    success: false,
                    message: "Requests not found!",
                    results
                });
            }

            return response.status(200).send({
                success: true,
                message: "Requests were found!",
                results
            });
        });
    },

    getByUserId(request, response) {
        const sqlGetRequests = `
            SELECT req_recipient_id, r.user_id, req_created_at, user_nick, user_name, user_location
            FROM request r, user u
            WHERE req_recipient_id = ? AND u.user_id = r.user_id
        `;

        connection.query(sqlGetRequests, [request.params.user_id], (err, results, fields) => {
            if(err) {
                return response.status(500).send({
                    success: false,
                    message: "Error fetching requests: " + err
                });
            }

            if(results.length == 0 || results == null) {
                return response.status(404).send({
                    success: false,
                    message: "Requests not found!",
                    results
                });
            }

            return response.status(200).send({
                success: true,
                message: "Requests were found!",
                results
            });
        });
    }
};