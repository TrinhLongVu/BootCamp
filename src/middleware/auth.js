'use strict'
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') && req.headers.authorization.split(' ')[1] ;

    console.log(token, "121312")
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized'
        });
    }

    jwt.verify(token, process.env.KEY_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: 403,
                message: 'Token verification failed'
            });
        }
        
        req.user = decoded;
        next();
    });
}

module.exports = authenticateToken