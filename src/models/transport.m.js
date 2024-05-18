'use strict'

const db = require('../dbs/mysql')
const {
    handleDatabaseError
} = require('../helpers/catch.error')

class transportModel {
    static async getTransport() {

    }
    static async createTransport({price, type}) {
        const add = await db.query(`
            insert into Transport(price, type)
            values(?, ?)`, [price, type]).catch(handleDatabaseError);
        if (add.affectedRows === 1) {
            const newId = add.insertId;
            return newId;
        }
        return false;
    }
}

module.exports = transportModel