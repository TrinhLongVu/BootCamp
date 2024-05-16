'use strict'

const { Created, OK } = require("../core/success.response")
const AuthenticateService = require("../services/authenticate.service")

class AuthenticateController {
    signUp = async (req, res, next) => {
        new Created({
            message: 'Register success',
            messageData: await AuthenticateService.signUp(req.body)
        }).send(res)
    }
    login = async (req, res, next) => {
        new Created({
            message: 'Login success',
            messageData: await AuthenticateService.logIn(req.body)
        }).send(res)
    }
    genOtp = async (req, res, next) => {
        new OK({
            message: 'Generate opt success',
            messageData: await AuthenticateService.genOtp(req.body)
        }).send(res)
    }
    verifyOtp = async (req, res, next) => {
        new OK({
            message: 'Generate opt success',
            messageData: await AuthenticateService.verifyOtp(req.body)
        }).send(res)
    }
    forgotPassword = async (req, res, next) => {
        new OK({
            message: 'Change password success',
            messageData: await AuthenticateService.changePassword(req.body)
        }).send(res)
    } 
}

module.exports = new AuthenticateController()