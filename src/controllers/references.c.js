'use strict'

const { OK } = require("../core/success.response")
const recommendService = require("../services/references.services")

class LablesRecommendation {
    RcAccommodation = async (req, res, next) => {
        new OK({
            message: 'get accommodation recommendations success',
            messageData: await recommendService.getAccommodation()
        }).send(res)
    }
    RcActivity = async (req, res, next) => {
        new OK({
            message: 'get activity recommendations success',
            messageData: await recommendService.getActivity()
        }).send(res)
    }
    RcTransport = async (req, res, next) => {
        new OK({
            message: 'get transport recommendations success',
            messageData: await recommendService.getTransport()
        }).send(res)
    }
}

module.exports = new LablesRecommendation()