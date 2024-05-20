'use strict'

const db = require('../dbs/mysql')
const {
    handleDatabaseError
} = require('../helpers/catch.error')

class planModel {
    // Delete plan but only using hidden view
    static async hiddenPlan({ idPlan, idUser }) {
        const update = await db.query(`
            UPDATE Plan
            SET isViewed = ?
            WHERE id = ? and id_user = ?;`, [false, idPlan, idUser]
        ).catch(handleDatabaseError);
        if (update.affectedRows === 1)
            return true
        return false;
    }

    // Back view detail then update viewAt
    static async viewPlan(id) {
        const update = await db.query(`
            UPDATE Plan
            SET viewedAt = ?
            WHERE id = ?;`, [new Date(), id]
        ).catch(handleDatabaseError);
        if (update.affectedRows === 1)
            return true
        return false;
    }

    // Create Plan
    static async createPlan({budget, id_user, start_point, end_point, start_day, end_day, id_transport}) {
        const add = await db.query(`
            insert into Plan(budget, id_user, start_point, end_point, start_day, end_day, id_transport, isViewed, createAt, viewedAt)
            values(?, ?, ?, ?, ?, ?, ?, ?, ?)`, [budget, id_user, start_point, end_point, start_day, end_day, id_transport, true, new Date(), new Date()]).catch(handleDatabaseError);
        if (add.affectedRows === 1)
            return add.insertId;
        return false;
    }

    static async createPlanActivity({ idPlan, idActivity, calendar }) {
        const add = await db.query(`
            insert into Activity_Plan(id_activity, id_plan, calendar)
            values(?, ?, ?)`, [idActivity, idPlan, calendar]).catch(handleDatabaseError);
        if (add.affectedRows === 1)
            return true
        return false;
    }    

    static async createPlanAccommodation({ id_accommodation, idPlan }) {
        const add = await db.query(`
            insert into Accommodation_Plan(id_accommodation, id_plan)
            values(?, ?)`, [id_accommodation, idPlan])
        if (add.affectedRows === 1)
            return true
        return false;
    }  

    static async getPlan({ idPlan, idUser }) {
        const plan = await db.query(`
            select distinct *
            from Plan p
            where p.id_user = ? and p.id = ?`
            ,[idUser, idPlan]
        ).catch(handleDatabaseError);;
        return plan[0];
    }

    // Get all activity of a user's plan.
    static async getActivityOfUser({ idPlan, idUser }) {
        const plan = await db.query(`
            select distinct a.*, ap.calendar
            from Plan p, Activity_Plan ap, Activity a
            where p.id_user = ? and p.id = ? and ap.id_plan = p.id and a.id = ap.id_activity and p.isViewed = true
            order by ap.calendar;`
            ,[idUser, idPlan]
        ).catch(handleDatabaseError);;
        return plan;
    }

    // Get all accommodation of a user's plan.
    static async getAccomodationOfUser({ idPlan, idUser }) {
        const plan = await db.query(`
            select distinct a.*
            from Plan p, Accommodation_Plan ap, Accommodation a
            where p.id_user = ? and p.id = ? and ap.id_plan = p.id and  a.id = ap.id_accommodation and p.isViewed = true;`
            ,[idUser, idPlan]
        ).catch(handleDatabaseError);;
        return plan;
    }

    // Get all plan of user
    static async getUserPlaning() {
        const plan = await db.query(`
            select * 
            from Plan
            where id_user = ?`
        ,[idUser]
        ).catch(handleDatabaseError);;
        return plan;
    }

    static async getCodeAirport(city) {
        const code = await db.query(`
            select idCode 
            from AirportCode
            where city = ?`
        ,[city]
        ).catch(handleDatabaseError);
        if (code[0] != undefined) 
            return code[0]
        return false;
    }

    static async viewRecent(idUser) {
        const plan = await db.query(`
            select id, start_point, end_point, start_day, end_day
            from Plan
            where id_user = ?
            order by viewedAt
            limit 4;
            `
        ,[idUser]
        ).catch(handleDatabaseError);
        return plan
    }
}

module.exports = planModel