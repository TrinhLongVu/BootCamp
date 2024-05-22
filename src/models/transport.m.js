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
    static async createTransport({price, type, name, start_time, end_time, duration}) {
        const add = await db.query(`
            insert into Transport(price, type, name, start_time, end_time, duration)
            values(?, ?, ?, ?, ?, ?)`, [price, type, name, start_time || null, end_time || null, duration || null]).catch(handleDatabaseError);
        if (add.affectedRows === 1) {
            const newId = add.insertId;
            return newId;
        }
        return false;
    }

    // create coach
    static async createCoach({start_point, end_point, price, name, duration }) {
        const add = await db.query(`
            insert into Coach(start_point, end_point, price, name, duration )
            values(?, ?, ?, ?, ?)`, [start_point, end_point, price, name, duration]).catch(handleDatabaseError);
        if (add.affectedRows === 1) {
            const newId = add.insertId;
            return newId;
        }
        return false;
    }

    // transport
    static async getTransport({ id }) {
        const coach = await db.query(`
            select *
            from Transport
            where id=?; 
            `
            ,[id]
        ).catch(handleDatabaseError);
        return coach
    }
}

module.exports = transportModel