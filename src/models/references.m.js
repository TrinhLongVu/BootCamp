'use strict'

const db = require('../dbs/mysql')
const {
    handleDatabaseError
} = require('../helpers/catch.error')

class LabelsRecommend {
    static async getRcAccommodation() {
        return await db.query('SELECT * FROM RcAccommodation').catch(handleDatabaseError);
    }

    static async getRcActivity() {
        return await db.query('SELECT * FROM RcActivity').catch(handleDatabaseError);
    }

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

    static async userAccommodation({id_rcAccommodation, id_user}) {
        const add = await db.query(`
            insert into User_RcAccommodation(id_rcAccommodation, id_user)
            values(?, ?)`, [id_rcAccommodation, id_user]).catch(handleDatabaseError);
        if (add.affectedRows === 1)
            return true
        return false;
    }

    static async getIdRcAccommodation(name) {
        return await db.query(`
            select id from RcAccommodation
            where name = ?;`, [name]
        ).catch(handleDatabaseError);
    }
}

module.exports = LabelsRecommend