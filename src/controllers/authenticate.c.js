'use strict'

const { Created } = require("../core/success.response")
const AuthenticateService = require("../services/authenticate.service")

class AuthenticateController {
    signUp = async (req, res, next) => {
        new Created({
            message: 'Register success',
            messageData: await AuthenticateService.signUp(req.body)
        }).send(res)
    }
}

module.exports = new AuthenticateController()