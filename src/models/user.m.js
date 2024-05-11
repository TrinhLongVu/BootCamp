'use strict'

const db = require('../dbs/mysql')
const {
    handleDatabaseError
} = require('../helpers/catch.error')

class UserModel {
    async getAllUsers() {
        return await db.query('SELECT * FROM users').catch(handleDatabaseError);
    }
}

module.exports = new UserModel()