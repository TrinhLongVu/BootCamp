'use strict'

const db = require('../dbs/mysql')
const {
    handleDatabaseError
} = require('../helpers/catch.error')

class transportModel {
    // get coach when having start point and end point
    static async getCoach({start_point, end_point}) {
        const coach = await db.query(`
            select id, price, name, duration 
            from Coach
            where start_point=? and end_point=?; 
            `
            ,[start_point, end_point]
        ).catch(handleDatabaseError);
        return coach
    }

    // create transport of a plan
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