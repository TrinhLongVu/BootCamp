'use strict'
const {
    BadRequest
} = require('../core/error.response')

class AuthenticateService {
    static signUp = async ({ name, email, password }) => {
        throw new BadRequest("User already registered")
    }
}

module.exports = AuthenticateService