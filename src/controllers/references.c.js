'use strict'

const { OK } = require("../core/success.response")
const recommendService = require("../services/references.services")

class LablesRecommendation {
    // get amentity
    RcAccommodation = async (req, res, next) => {
        new OK({
            message: 'get amentity success',
            messageData: await recommendService.getAccommodation()
        }).send(res)
    }
    // get recommend activity
    RcActivity = async (req, res, next) => {
        new OK({
            message: 'get activity recommendations success',
            messageData: await recommendService.getActivity()
        }).send(res)
    }
    // get recommend transport
    RcTransport = async (req, res, next) => {
        new OK({
            message: 'get transport recommendations success',
            messageData: await recommendService.getTransport()
        }).send(res)
    }
}

module.exports = new LablesRecommendation()