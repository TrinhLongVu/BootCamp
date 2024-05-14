'use strict'

const {
    OK
} = require("../core/success.response")
const planService = require("../services/plan.service")

class planController {
    hiddenPlan = async (req, res, next) => {
        new OK({
            message: 'get user success',
            messageData: await planService.hiddenPlan(req.body)
        }).send(res)
    }
}

module.exports = new planController()