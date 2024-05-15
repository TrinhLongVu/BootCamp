'use strict'

const db = require('../dbs/mysql')
const {
    handleDatabaseError
} = require('../helpers/catch.error')

class accommodationModel {
    async insertDB({ name, price, rating, type_accommodation }) {
        const update = await db.query(`
            insert into Accommodation(name, price, rating, type_accommodation)
            values(?, ?, ?, ?);`, [name, price, rating, type_accommodation]
        ).catch(handleDatabaseError);
        if (update.affectedRows === 1)
            return true
        return false;
    }

    async getAccommodation({ name }) {
        const get = await db.query(`
            SELECT * from Accommodation
            Where name = ?`, [name]
        ).catch(handleDatabaseError);
        if (get.affectedRows === 1)
            return true
        return false;
    }
}

module.exports = new accommodationModel()