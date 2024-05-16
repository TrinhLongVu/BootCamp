'use strict'

const {
    OK
} = require("../core/success.response")
const planService = require("../services/plan.service")

class planController {
    hiddenPlan = async (req, res, next) => {
        new OK({
            message: 'hidden plan success',
            messageData: await planService.hiddenPlan(req.body.idPlan, req.user.id)
        }).send(res)
    }
    getPlan = async (req, res, next) => {
        new OK({
            message: 'get plan success',
            messageData: await planService.getDetailPlan(req.body.idPlan, req.user.id)
        }).send(res)
    }
}

module.exports = new planController()