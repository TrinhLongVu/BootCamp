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
    static async createPlan({budget, id_user, destination, start_day, end_day, id_transport}) {
        const add = await db.query(`
            insert into Plan(budget, id_user, destination, start_day, end_day, id_transport, isViewed, createAt)
            values(?, ?, ?, ?, ?, ?, ?, ?)`, [budget, id_user, destination, start_day, end_day, id_transport, true, new Date()]).catch(handleDatabaseError);
        if (add.affectedRows === 1)
            return true
        return false;
    }

    static async createPlanActivity({ idPlan, idActivity, calendar }) {
        const add = await db.query(`
            insert into Activity_Plan(id_activity, id_plan, calendar)
            values(?, ?, ?)`, [idPlan, idActivity, calendar]).catch(handleDatabaseError);
        if (add.affectedRows === 1)
            return true
        return false;
    }    

    static async createPlanAccommodation({ id_accommodation, idActivity, calendar }) {
        const add = await db.query(`
            insert into Accommodation_Plan(id_accommodation, id_plan, calendar)
            values(?, ?, ?)`, [id_accommodation, idActivity, calendar]).catch(handleDatabaseError);
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
        );
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
        );
        return plan;
    }

    // Get all accommodation of a user's plan.
    static async getAccomodationOfUser({ idPlan, idUser }) {
        const plan = await db.query(`
            select distinct a.*, ap.calendar
            from Plan p, Accommodation_Plan ap, Accommodation a
            where p.id_user = ? and p.id = ? and ap.id_plan = p.id and  a.id = ap.id_accommodation and p.isViewed = true
            order by ap.calendar;`
            ,[idUser, idPlan]
        );
        return plan;
    }

    // Get all plan of user
    static async getUserPlaning() {
        const plan = await db.query(`
            select * 
            from Plan
            where id_user = ?`
        ,[idUser]
        );
        return plan;
    }
}

module.exports = planModel