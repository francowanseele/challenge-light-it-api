const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Load routings
const authRoutes = require('./routers/auth');
const userRoutes = require('./routers/user');
const healthServiceRoutes = require('./routers/healthservice');

// Config body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configure Header HTTP
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// router Basic
app.use(`/api`, authRoutes);
app.use(`/api`, userRoutes);
app.use(`/api`, healthServiceRoutes);

// Export
module.exports = app;
