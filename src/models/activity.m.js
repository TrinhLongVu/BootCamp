'use strict'

const db = require('../dbs/mysql')
const {
    handleDatabaseError
} = require('../helpers/catch.error')

class activityModel {
    static async insertDB({ id, name, rating, num_comment, price,image, address, distance, type_activity, openTime, closeTime }) {
        if (image.length > 1000) {
            image = null
        }
        const update = await db.query(`
            INSERT INTO Activity (id, name, rating, num_comment, price, image, address, type_activity, distance, openTime, closeTime)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [id, name || null, parseFloat(rating) || 0, parseInt(num_comment) || 0, parseFloat(price) || 0, image || null, address || null, type_activity || null, distance, openTime, closeTime]
        ).catch(handleDatabaseError);
        if (update.affectedRows === 1)
            return true
        return false;
    }

    // select activity
    static async getActivity({ id }) {
        const get = await db.query(`
            SELECT * from Activity
            Where id = ?`, [id]
        ).catch(handleDatabaseError);
        if (get.affectedRows === 1)
            return get
        return false;
    }
}

module.exports = activityModel