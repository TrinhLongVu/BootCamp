'use strict'
const {
    BadRequest,
} = require('../core/error.response')
const planModel = require('../models/plan.m')
const activityModel = require('../models/activity.m')
const accommodationModel = require('../models/accommodation.m')
const helpers = require('../helpers/helper')
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

    // check valid plan
    static checkValidPlan = async({ departure , arrival}) => {
        const departureCode = await planModel.getCodeAirport(departure);
        if (departureCode == false) {
            return "There is no departure airport"
        }
        const arrivalCode = await planModel.getCodeAirport(arrival);
        if (arrivalCode == false) {
            return "There is no arrival airport"
        }
        return true;
    }

    // create plan 
    static createPlan = async ({ types, amenities_input, budget, start_day, end_day, start_point, end_point, type_transport }, id) => {
        // get day from start day to end day
        const days = (new Date(end_day) - new Date(start_day)) / (1000 * 60 * 60 * 24);
        let flights = [];
        if (type_transport == "flight") {
            const codeStart = await planModel.getCodeAirport(start_point)
            const codeEnd = await planModel.getCodeAirport(end_point)
            const data = await helpers.getflight({
                departure_id: codeStart.idCode,
                arrival_id: codeEnd.idCode,
                outbound_date: start_day,
                return_date: end_day
            })
            flights = data.best_flights
            budget -= flights[0].price
        }
        const response = await helpers.getRecommendPlan({ days, city: end_point, id, types, amenities_input, budget, type_transport, start_day, end_day, start_point })
        if(response == undefined) throw new BadRequest("get recommend faild")
        const plans = response.data;
        const detailPlans = [];
        for (const plan of plans) {
            const activities = []
            for (const idActivity of plan.activity) {
                activities.push(await activityModel.getActivity({id: idActivity}))
            }

            const hotel = await accommodationModel.getAccommodation({ id: plan.hotel })
            detailPlans.push({
                activities,
                hotel,
                transport: flights[0],
                total: plan.total,
            })
        }

        return {
            start_day,
            end_day,
            start_point,
            end_point,
            detailPlans
        };
    }

    // save plan
    static savePlan = async ({ activities, hotel, transport, start_day, end_day, budget, start_point, end_point }, idUser) => {
        const id_transport = await transportModel.createTransport(transport)
        const idPlan = await planModel.createPlan({
            budget, id_user: idUser, start_point, end_point, start_day, end_day, id_transport
        })
        if(!idPlan) throw new BadRequest("create plan failed")
        let count = 1;
        let calendar = new Date(start_day);
        for (const idActivity of activities) {
            console.log(idActivity, idPlan)
            const isSuccess = await planModel.createPlanActivity({ idPlan: idPlan, idActivity: idActivity, calendar })
            if(!isSuccess) throw new BadRequest("create plan activity failed")
            if (count % 3 == 0) {
                calendar + 1;
            }
            count++;
        }

        const isSuccess = await planModel.createPlanAccommodation({ id_accommodation: hotel, idPlan: idPlan })
        if (!isSuccess) throw new BadRequest("create plan hotel failed")
        return {}
    }

    // get all plan for user
    static getUserPlan = async(idUser) => {
        const plan = await planModel.getUserPlaning(idUser)
        return {
            plan
        }
    }

    static viewAt = async ({ idPlan }) => {
        const isUpdated = await planModel.viewPlan(idPlan)
        if (!isUpdated) throw new BadRequest("update view is failed");
        return {}
    }
}

module.exports = planService