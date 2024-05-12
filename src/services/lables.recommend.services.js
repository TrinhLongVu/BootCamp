'use strict'
const {
    BadRequest,
    AuthRequest
} = require('../core/error.response')

const lablesrModel = require('../models/labels.recommend.m')

class LablesService {
    static getAccommodation = async () => {
        const RcAccommodation = await lablesrModel.getRcAccommodation();
        if (!RcAccommodation) {
            throw new BadRequest("Error get accommodation recommendations");
        }
        return {
            lables: RcAccommodation
        }
    }
}

module.exports = LablesService