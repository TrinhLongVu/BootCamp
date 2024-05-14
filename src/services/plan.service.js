'use strict'
const {
    BadRequest,
    AuthRequest
} = require('../core/error.response')
const planModel = require('../models/plan.m')


class planService {
    static hiddenPlan = async ({id}) => {
        const isUpdated = await planModel.hiddenPlan(id);

        if (!isUpdated) {
            throw new BadRequest("delete failed")
        }

        return {}
    }
}

module.exports = planService