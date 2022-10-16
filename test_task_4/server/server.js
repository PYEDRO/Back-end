const express = require('express');
const app = express();

app.use('/', require('./route/postsRoutes'))

app.listen(3000);
