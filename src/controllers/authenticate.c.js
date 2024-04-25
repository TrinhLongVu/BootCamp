'use strict'

const AuthenticateService = require("../services/authenticate.service")

class AuthenticateController {
    signUp = async (req, res, next) => {
        try {
            console.log("authenticateController", req.body)
            res.status(201).json(await AuthenticateService.signUp(req.body))
        } catch(err) {
            next(err)
        }
    }
}

module.exports = new AuthenticateController()