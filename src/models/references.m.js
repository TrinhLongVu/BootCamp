'use strict'

const db = require('../dbs/mysql')
const {
    handleDatabaseError
} = require('../helpers/catch.error')

class LabelsRecommend {
    // get all amentity of hotels
    static async getRcAccommodation() {
        return await db.query('SELECT * FROM RcAccommodation').catch(handleDatabaseError);
    }

    // get all recommend of activity
    static async getRcActivity() {
        return await db.query('SELECT * FROM RcActivity').catch(handleDatabaseError);
    }

    // get all recommendation of transport
    static async getRcTransport() {
        return await db.query('SELECT * FROM RcTransport').catch(handleDatabaseError);
    }

    // handle user reference
    static async userActivity({id_rcActivity, id_user}) {
        const add = await db.query(`
            insert into User_RcActivity(id_rcActivity, id_user)
            values(?, ?)`, [id_rcActivity, id_user]).catch(handleDatabaseError);
        if (add.affectedRows === 1)
            return true
        return false;
    }

    //save preference amenity into user
    static async userAccommodation({id_rcAccommodation, id_user}) {
        const add = await db.query(`
            insert into User_RcAccommodation(id_rcAccommodation, id_user)
            values(?, ?)`, [id_rcAccommodation, id_user]).catch(handleDatabaseError);
        if (add.affectedRows === 1)
            return true
        return false;
    }

    // get id of amentity by name
    static async getIdRcAccommodation(name) {
        return await db.query(`
            select id from RcAccommodation
            where name = ?;`, [name]
        ).catch(handleDatabaseError);
    }
}

module.exports = LabelsRecommend