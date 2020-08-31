const express = require('express');
const app = express();
const port = 3333;

app.get('/', (request, response, next) => {
    response.send("Hello, world! Working!");
});

app.listen(port, () => {
    console.log("Server is running at localhost on port " + port);
});

app.listen();