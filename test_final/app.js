const express = require('express');
const app =  express();
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log('Server is listening on ${server.address().port}');
})