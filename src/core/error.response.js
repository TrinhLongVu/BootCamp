'use strict'

const statusCode = {
    FORBIDEN: 403
}

const messageCode = {
    FORBIDEN: 'Bad request error'
}

class HandelError extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class BadRequest extends HandelError {
    constructor(message = messageCode.FORBIDEN, status = statusCode.FORBIDEN) {
        super(message, status)
    }
}

module.exports = { BadRequest }