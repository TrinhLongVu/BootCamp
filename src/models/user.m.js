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
            INSERT INTO User (fullname, email, password, avatar, role, isActivated)
            VALUES (?, ?, ?, ?, ?, ?)`, [fullname, email, password, 'http://res.cloudinary.com/dupsdtrvy/image/upload/v1716004762/1716004760302.jpg', 'user', false]
        ).catch(handleDatabaseError);
        if (user.affectedRows === 1)
            return true
        return false;
    }

    static async updateOtp({ otp, email, createAt }) {
        const user = await db.query(`
            UPDATE User
            SET otp = ?, create_otp = ?
            WHERE email = ?;`, [otp, createAt, email]
        ).catch(handleDatabaseError);
        if (user.affectedRows === 1)
            return true
        return false;
    }

    static async activeUser({email}) {
        const user = await db.query(`
            UPDATE User
            SET isActivated = ?
            WHERE email = ?;`, [true, email]
        ).catch(handleDatabaseError);
        if (user.affectedRows === 1)
            return true
        return false;
    }

    static async updateUser({ user }) {
        const update = await db.query(`
            UPDATE User
            SET fullname = ?, avatar = ?
            WHERE email = ?;`, [user.fullname, user.avatar, user.email]
        ).catch(handleDatabaseError);
        if (update.affectedRows === 1)
            return true
        return false;
    }
    
    static async updatePassword({ email, password }) {
        const update = await db.query(`
            UPDATE User
            SET password = ?
            WHERE email = ?;`, [password, email]
        ).catch(handleDatabaseError);
        if (update.affectedRows === 1)
            return true
        return false;
    }
}

module.exports = UserModel