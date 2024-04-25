'use strict'

class AuthenticateService {
    static signUp = async ({ name, email, password }) => {
        try {
            return {
                code: "201", 
            }
        } catch(err) {
            return {
                code: "403",
                message: err
            }
        }
    }
}

module.exports = AuthenticateService