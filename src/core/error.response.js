'use strict'

const statusCode = require('./httpStatusCodes')
const reasonCode = require('./reasonPhrases')

class HandelError extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class BadRequest extends HandelError {
    constructor(message = reasonCode.FORBIDDEN, status = statusCode.FORBIDDEN) {
        super(message, status)
    }
}

class AuthRequest extends HandelError {
    constructor(message = reasonCode.UNAUTHORIZED, status = statusCode.UNAUTHORIZED) {
        super(message, status)
    }
}

module.exports = { BadRequest, AuthRequest}