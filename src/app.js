require('dotenv').config();
const express = require("express")
const app = express();
const morgan = require("morgan")
const compression = require("compression")
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Init using get file
app.use(fileUpload({
    useTempFiles : true,
}));

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

// inset data into database
// insertData = async () => {
//     await require('./uploadfilecsv/uploadfile')()
// }
// insertData()

//router
app.use('/v1/api', require('./routers'))

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