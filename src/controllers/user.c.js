'use strict'

const {
    OK
} = require("../core/success.response")
const userService = require("../services/user.service")

class userController {
    getInfo = async (req, res, next) => {
        new OK({
            message: 'get user success',
            messageData: await userService.getInfo(req.params.id)
        }).send(res)
    }

    updateInfo = async (req, res, next) => {
        new OK({
            message: 'update user success',
            messageData: await userService.updateInfo({
                email: req.user.email,
                file: req.files,
                name: req.body.name
            })
        }).send(res)
    }
}

module.exports = new userController()