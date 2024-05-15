'use strict'

const db = require('../dbs/mysql')
const {
    handleDatabaseError
} = require('../helpers/catch.error')

class planModel {
    // Delete plan but only using hidden view
    async hiddenPlan(id) {
        const update = await db.query(`
            UPDATE Plan
            SET isViewed = ?
            WHERE id = ?;`, [false, id]
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
}

module.exports = new planModel()