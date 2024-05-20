'use strict'

const db = require('../dbs/mysql')
const {
    handleDatabaseError
} = require('../helpers/catch.error')

class transportModel {
    static async getTransport() {

    }
    static async createTransport({price, type, name, start_time, end_time}) {
        const add = await db.query(`
            insert into Transport(price, type, name, start_time, end_time)
            values(?, ?, ?, ?, ?)`, [price, type, name, start_time, end_time]).catch(handleDatabaseError);
        if (add.affectedRows === 1) {
            const newId = add.insertId;
            return newId;
        }
        return false;
    }
}

module.exports = transportModel