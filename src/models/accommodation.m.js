'use strict'

const db = require('../dbs/mysql')
const {
    handleDatabaseError
} = require('../helpers/catch.error')

class accommodationModel {
    // insert accommodation into database
    static async insertDB({id, name, price, rating, address }) {
        const update = await db.query(`
            insert into Accommodation(id, name, price, rating, address)
            values(?, ?, ?, ?, ?);`, [id, name, price, rating, address]
        ).catch(handleDatabaseError);
        if (update.affectedRows === 1) {
            return id;
        }
        return false;
    }

    // insert amentity into acommodation. due 1 acommodation have more amentity
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

    // get accommodation by id
    static async getAccommodation({ id }) {
        const accommodation = await db.query(`
            SELECT * from Accommodation
            Where id = ?`, [id]
        ).catch(handleDatabaseError);

        if (accommodation[0] != undefined)
            return accommodation[0]
        return false;
    }
}

module.exports = accommodationModel