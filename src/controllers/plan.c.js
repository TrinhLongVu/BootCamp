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
    // get plan detail
    getDetailPlan = async (req, res, next) => {
        new OK({
            message: 'get plan detail success',
            messageData: await planService.getDetailPlan(req.body.idPlan, req.user.id)
        }).send(res)
    }
    // get plan 
    getPlan = async (req, res, next) => {
        new OK({
            message: 'get plan success',
            messageData: await planService.getUserPlan(req.user.id)
        }).send(res)
    }
}

module.exports = new planController()