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

    static getActivity = async () => {
        const RcActivity = await lablesrModel.getRcActivity();
        if (!RcActivity) {
            throw new BadRequest("Error get activity recommendations");
        }
        return {
            lables: RcActivity
        }
    }

    static getTransport = async () => {
        const RcTransport = await lablesrModel.getRcTransport();
        if (!RcTransport) {
            throw new BadRequest("Error get transport recommendations");
        }
        return {
            lables: RcTransport
        }
    }
}

module.exports = LablesService