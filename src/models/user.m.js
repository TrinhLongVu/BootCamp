'use strict'

const db = require('../dbs/mysql')
const {
    handleDatabaseError
} = require('../helpers/catch.error')

class UserModel {
    static async getAllUsers() {
        return await db.query('SELECT * FROM user').catch(handleDatabaseError);
    }

    static async getUser({ email }) {
        const user = await db.query(`
            SELECT * 
            FROM User
            WHERE email = ?`, [email]
        );
        return user[0];
    }
        
    static async addUser({ email, fullname, password}) {
        const user = await db.query(`
            INSERT INTO User (fullname, email, password, role)
            VALUES (?, ?, ?, ?)`, [fullname, email, password, 'user']
        );
        return user;
    }
}

module.exports = UserModel