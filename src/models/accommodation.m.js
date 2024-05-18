'use strict'

const db = require('../dbs/mysql')
const {
    handleDatabaseError
} = require('../helpers/catch.error')

class accommodationModel {
    static async insertDB({ name, price, rating, address }) {
        const update = await db.query(`
            insert into Accommodation(name, price, rating, address)
            values(?, ?, ?, ?);`, [name, price, rating, address]
        ).catch(handleDatabaseError);
        if (update.affectedRows === 1) {
            const newId = update.insertId;
            return newId;
        }
        return false;
    }

    static async Accommodation_RcAccommodation({idAccommodation, idRcAccommodation}) {
        const update = await db.query(`
            insert into Accommodation_RcAccommodation(idAccommodation, idRcAccommodation)
            values(?, ?);`, [idAccommodation, idRcAccommodation]
        ).catch(handleDatabaseError);
        if (update.affectedRows === 1) {
            return true
        }
        return false;
    }

    static async getAccommodation({ name }) {
        const get = await db.query(`
            SELECT * from Accommodation
            Where name = ?`, [name]
        ).catch(handleDatabaseError);
        if (get.affectedRows === 1)
            return true
        return false;
    }
}

module.exports = accommodationModel