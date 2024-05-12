'use strict'
const {
    BadRequest,
    AuthRequest
} = require('../core/error.response')

const userModel = require('../models/user.m')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

class AuthenticateService {
    static signUp = async ({
        name,
        email,
        password
    }) => {
        const user = await userModel.getUser({ email})
        if (user) {
            throw new BadRequest("User already registered")
        }

        const passHash = await bcrypt.hash(password, 10)
        const newuser = await userModel.addUser({ email, fullname: name, password: passHash })
        
        if (newuser.affectedRows !== 1) {
            throw new BadRequest("Error create user")
        }
            
        return {
            user: {
                id: newuser.insertId,
                fullname: name, 
                email: email
            }
        }
    }

    static logIn = async ({ email, password }) => {
        const user = await userModel.getUser({ email })
        if (!user) {
            throw new BadRequest("User is not exits")
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw new AuthRequest("Error Password")
        }

        const token = jwt.sign(user, process.env.KEY_TOKEN, { expiresIn: '1h' }); 
        
        return {
            token: token,
            expiresIn: '1h'
        }
    }
}

module.exports = AuthenticateService