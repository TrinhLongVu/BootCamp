'use strict'

const { Created } = require("../core/success.response")
const recommendService = require("../services/lables.recommend.services")

class LablesRecommendation {
    RcAccommodation = async (req, res, next) => {
        new Created({
            message: 'get recommendations success',
            messageData: await recommendService.getAccommodation()
        }).send(res)
    }
}

module.exports = new LablesRecommendation()