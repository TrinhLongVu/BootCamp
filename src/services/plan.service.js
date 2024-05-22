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
    // hidden plan. when user delete plan then hidden it.
    static hiddenPlan = async (idPlan, idUser) => {
        const isUpdated = await planModel.hiddenPlan({idPlan, idUser});
        if (!isUpdated) {
            throw new BadRequest("delete failed")
        }
        return {}
    }

    static getDetailPlan = async (idPlan, idUser) => {
        const plan = await planModel.getPlan({ idPlan, idUser })
        await planModel.insertViewAt({ idUser, idPlan })        

        if (plan == undefined) {
            throw new BadRequest("plan is not exits")
        }

        // get all activity of a user's plan
        const activity = await planModel.getActivityOfUser({ idPlan, idUser });
        // get all accommodation of a user's plan
        const accommodation = await planModel.getAccomodationOfUser({ idPlan, idUser });
        const transport = await transportModel.getTransport({id: plan.id_transport})
        
        return {
            plan,
            activity,
            accommodation,
            transport
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
        let transports = [];

        // amentities
        if (amenities_input.length == 0) amenities_input = [0 , 1]
        // types
        if (types.length == 0) types = ['Du lịch giải trí']
        
        if (type_transport == "flight") {
            // get id code of start point and end point
            const codeStart = await planModel.getCodeAirport(start_point)
            const codeEnd = await planModel.getCodeAirport(end_point)

            // if dont have any airport then change transport to coach.
            if (!codeStart.idCode || !codeEnd.idCode) {
                type_transport = "coach";
            } else {
                // get flight call api 
                const data = await helpers.getflight({
                    departure_id: codeStart.idCode,
                    arrival_id: codeEnd.idCode,
                    outbound_date: start_day,
                    return_date: end_day
                })
                // get top 1 best flights
                transports = data.best_flights
                budget -= transports[0].price
            }
        }
        if (type_transport == "coach") {
            // get coach in database
            const coach = await transportModel.getCoach({ start_point, end_point });
            if (coach == undefined) throw new BadRequest("dont have any coach.");

            transports = coach;
            budget -= transports[0].price
        }
        // call api to get recommend plan
        const response = await helpers.getRecommendPlan({ days, city: end_point, id, types, amenities_input, budget, type_transport, start_day, end_day, start_point })
        if(response == undefined) throw new BadRequest("get recommend faild")
        const plans = response.data;
        const detailPlans = [];
        
        // format response from model
        for (const plan of plans) {
            const activities = []
            for (const idActivity of plan.activity) {
                // get detail of activity when having id
                activities.push(await activityModel.getActivity({id: idActivity}))
            }
            // get detail of hotel.
            const hotel = await accommodationModel.getAccommodation({ id: plan.hotel })
            detailPlans.push({
                activities,
                hotel,
                transport: transports[0],
                total: plan.total + transports[0].price,
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
        // create transport.
        const id_transport = await transportModel.createTransport(transport)
        // create plan
        const idPlan = await planModel.createPlan({
            budget, id_user: idUser, start_point, end_point, start_day, end_day, id_transport
        })
        if(!idPlan) throw new BadRequest("create plan failed")
        let count = 1;
        let calendar = new Date(start_day);
        for (const idActivity of activities) {
            // create activity is included in plan
            const isSuccess = await planModel.createPlanActivity({ idPlan: idPlan, idActivity: idActivity, calendar })
            if(!isSuccess) throw new BadRequest("create plan activity failed")
            if (count % 3 == 0) {
                calendar + 1;
            }
            count++;
        }
        // create amentity is included in plan
        const isSuccess = await planModel.createPlanAccommodation({ id_accommodation: hotel, idPlan: idPlan })
        if (!isSuccess) throw new BadRequest("create plan hotel failed")
        return {
            idPlan
        }
    }

    // get all plan for user
    static getUserPlan = async (idUser) => {
        const plan = await planModel.getUserPlaning(idUser)
        return {
            plan
        }
    }
    
    // update view plan at
    static viewAt = async ({ idPlan }) => {
        const isUpdated = await planModel.viewPlan(idPlan)
        if (!isUpdated) throw new BadRequest("update view is failed");
        return {}
    }
    
    // get recent
    static viewRecent4 = async (idUser) => {
        const listPlan = await planModel.viewRecent(idUser)
        return {
            plan: listPlan
        }
    }

    static viewRecent = async (idUser) => {
        const listPlan = await planModel.viewRecent4(idUser);
        return {
            plan: listPlan
        }
    }
}

module.exports = planService