'use strict'
const {
    BadRequest,
    AuthRequest
} = require('../core/error.response')
const planModel = require('../models/plan.m')


class planService {
    static hiddenPlan = async (idPlan, idUser) => {
        const isUpdated = await planModel.hiddenPlan({idPlan, idUser});

        if (!isUpdated) {
            throw new BadRequest("delete failed")
        }

        return {}
    }

    static getDetailPlan = async (idPlan, idUser) => {
        const plan = await planModel.getDetailPlan({idPlan, idUser})

        return {
            plan
        }
    }
}

module.exports = planService