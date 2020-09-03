const express = require('express');
const app = express();
const cors = require('cors');
const port = 3333;
const routes = require('./routes');

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "content-type, x-access-token");
    response.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log("Server is running at localhost on port " + port);
});