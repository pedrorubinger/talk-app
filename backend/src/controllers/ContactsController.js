const connection = require('../config/connection');

module.exports = {
    getById(request, response) {
        const sqlGetAll = "SELECT * from contact WHERE user_id = ?";

        connection.query(sqlGetAll, [request.params.user_id], (err, results, fields) => {
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
    }
}