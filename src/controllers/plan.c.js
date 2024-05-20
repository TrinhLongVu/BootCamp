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
    // create planning
    createPlan = async (req, res, next) => {
        new OK({
            message: 'create plan success',
            messageData: await planService.createPlan(req.body, req.user.id)
        }).send(res)
    }
    // check valid plan
    checkValid = async (req, res, next) => {
        new OK({
            message: 'check plan success',
            messageData: await planService.checkValidPlan(req.body)
        }).send(res)
    }
    // save plan
    savePlan = async (req, res, next) => {
        new OK({
            message: 'save plan success',
            messageData: await planService.savePlan(req.body, req.user.id)
        }).send(res)
    }
    // view At
    viewAt = async (req, res, next) => {
        new OK({
            message: 'update view at success',
            messageData: await planService.viewAt(req.body, req.user.id)
        }).send(res)
    }
}

module.exports = new planController()