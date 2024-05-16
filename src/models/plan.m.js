'use strict'

const db = require('../dbs/mysql')
const {
    handleDatabaseError
} = require('../helpers/catch.error')

class planModel {
    // Delete plan but only using hidden view
    async hiddenPlan({ idPlan, idUser }) {
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
    async viewPlan(id) {
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
    async createPlan({budget, id_user, destination, start_day, end_day, id_transport}) {
        const add = await db.query(`
            insert into Plan(budget, id_user, destination, start_day, end_day, id_transport, isViewed, createAt)
            values(?, ?, ?, ?, ?, ?, ?, ?)`, [budget, id_user, destination, start_day, end_day, id_transport, true, new Date()]).catch(handleDatabaseError);
        if (add.affectedRows === 1)
            return true
        return false;
    }

    async createPlanActivity({ idPlan, idActivity, calendar }) {
        const add = await db.query(`
            insert into Activity_Plan(id_activity, id_plan, calendar)
            values(?, ?, ?)`, [idPlan, idActivity, calendar]).catch(handleDatabaseError);
        if (add.affectedRows === 1)
            return true
        return false;
    }    

    async createPlanAccommodation({ id_accommodation, idActivity, calendar }) {
        const add = await db.query(`
            insert into Accommodation_Plan(id_accommodation, id_plan, calendar)
            values(?, ?, ?)`, [id_accommodation, idActivity, calendar]).catch(handleDatabaseError);
        if (add.affectedRows === 1)
            return true
        return false;
    }  

    async getDetailPlan({ idPlan, idUser }) {
        const plan = await db.query(`
            select distinct p.id idPlan, p.destination destination, p.start_day start_day, p.end_day end_day, a.id idActivity, a.rating ratingActivity, a.num_comment commentActivity, a.price priceActivity, a.image imageActivity, a.address addressActivity, ac.id idAccommodation, ac.name nameAccommodation, ac.price priceAccommodation, ac.rating ratingAccommodation 
            from Plan p, Activity_Plan ap, Activity a, Accommodation_Plan acp, Accommodation ac, Transport t
            where p.id_user = ? and p.id = ? and ap.id_plan = p.id and a.id = ap.id_activity and acp.id_plan = p.id and ac.id = acp.id_accommodation and t.id = p.id_transport and p.isViewed = true`
            ,[idUser, idPlan]
        );
        return plan;
    }
}

module.exports = new planModel()