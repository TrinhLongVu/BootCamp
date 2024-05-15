'use strict'

const db = require('../dbs/mysql')
const {
    handleDatabaseError
} = require('../helpers/catch.error')

class LabelsRecommend {
    async getRcAccommodation() {
        return await db.query('SELECT * FROM RcAccommodation').catch(handleDatabaseError);
    }

    async getRcActivity() {
        return await db.query('SELECT * FROM RcActivity').catch(handleDatabaseError);
    }

    async getRcTransport() {
        return await db.query('SELECT * FROM RcTransport').catch(handleDatabaseError);
    }
}

module.exports = new LabelsRecommend()