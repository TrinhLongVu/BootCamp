'use strict'

const db = require('../dbs/mysql')
const {
    handleDatabaseError
} = require('../helpers/catch.error')

class planModel {
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
}

module.exports = new planModel()