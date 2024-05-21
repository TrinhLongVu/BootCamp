'use strict'
const {
    BadRequest,
    AuthRequest
} = require('../core/error.response')

const lablesrModel = require('../models/references.m')

class LablesService {
    // get all amentity accommodation
    static getAccommodation = async () => {
        const RcAccommodation = await lablesrModel.getRcAccommodation();
        if (!RcAccommodation) {
            throw new BadRequest("Error get amentity accommodation");
        }
        return {
            lables: RcAccommodation
        }
    }

    // get all activity recommendation
    static getActivity = async () => {
        const RcActivity = await lablesrModel.getRcActivity();
        if (!RcActivity) {
            throw new BadRequest("Error get activity recommendations");
        }
        return {
            lables: RcActivity
        }
    }

    // get all transport recommendation
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