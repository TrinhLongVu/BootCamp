'use strict'
const {
    BadRequest,
    AuthRequest
} = require('../core/error.response')
const planModel = require('../models/plan.m')
const transportModel = require('../models/transport.m')


class planService {
    static hiddenPlan = async (idPlan, idUser) => {
        const isUpdated = await planModel.hiddenPlan({idPlan, idUser});

        if (!isUpdated) {
            throw new BadRequest("delete failed")
        }

        return {}
    }

    static getDetailPlan = async (idPlan, idUser) => {
        const plan = await planModel.getPlan({ idPlan, idUser })
        if (plan == undefined) {
            throw new BadRequest("plan is not exits")
        }

        // get all activity of a user's plan
        const activity = await planModel.getActivityOfUser({ idPlan, idUser });
        // get all accommodation of a user's plan
        const accommodation = await planModel.getAccomodationOfUser({ idPlan, idUser });
        
        return {
            plan,
            activity,
            accommodation
        }
    }

    // create plan 
    static createPlan = async ({ budget, id_user, destination, start_day, end_day, idActivity }, idUser) => {
        // handle after

        

        await  transportModel.createTransport()
    }

    // get all plan for user
    static getUserPlan = async(idUser) => {
        const plan = await planModel.getUserPlaning(idUser)
        return {
            plan
        }
    }
}

module.exports = planService