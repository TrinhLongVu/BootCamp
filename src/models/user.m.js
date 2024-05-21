'use strict'

const db = require('../dbs/mysql')
const {
    handleDatabaseError
} = require('../helpers/catch.error')

class UserModel {
    // get user by email. email is unique
    static async getUser({ email }) {
        const user = await db.query(`
            SELECT * 
            FROM User
            WHERE email = ?`, [email]
        );
        return user[0];
    }

    // get user by id
    static async getUserById({ id }) {
        const user = await db.query(`
            SELECT * 
            FROM User
            WHERE id = ?`, [id]
        );
        return user[0];
    }
        
    // save user into database
    static async addUser({ email, fullname, password}) {
        const user = await db.query(`
            INSERT INTO User (fullname, email, password, avatar, role, isActivated)
            VALUES (?, ?, ?, ?, ?, ?)`, [fullname, email, password, 'http://res.cloudinary.com/dupsdtrvy/image/upload/v1716131826/1716131820650.png', 'user', false]
        ).catch(handleDatabaseError);
        if (user.affectedRows === 1)
            return true
        return false;
    }

    // update otp for user
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

    // if user verify otp success then user is activated
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

    // update into user
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
    
    // update password user when user forgot password
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