require('dotenv').config();
const express = require("express")
const app = express();
const morgan = require("morgan")
const compression = require("compression")

//Init middlewares
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(morgan("dev")) // Change color status in terminal
app.use(compression()) // Decrease load data

//Connect DB
//require('./dbs/mongodb')
require('./dbs/mysql'); 

//router
app.use('', require('./routers'))

// handle error
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    });
});

module.exports = app