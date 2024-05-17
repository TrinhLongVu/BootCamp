'use strict'

const db = require('../dbs/mysql')
const {
    handleDatabaseError
} = require('../helpers/catch.error')

class activityModel {
    async insertDB({ name, rating, num_comment, price, image, address, type_activity }) {
        if (image.length > 1000) {
            image = null
        }
        const update = await db.query(`
            INSERT INTO Activity (name, rating, num_comment, price, image, address, type_activity)
            VALUES (?, ?, ?, ?, ?, ?, ?);`, [name || null, parseFloat(rating) || 0, parseInt(num_comment) || 0, parseFloat(price) || 0, image || null, address || null, type_activity || null]
        ).catch(handleDatabaseError);
        if (update.affectedRows === 1)
            return true
        return false;
    }

    // select activity
    async getActivity({ name }) {
        const get = await db.query(`
            SELECT * from Activity
            Where name = ?`, [name]
        ).catch(handleDatabaseError);
        if (get.affectedRows === 1)
            return true
        return false;
    }
}

module.exports = new activityModel()