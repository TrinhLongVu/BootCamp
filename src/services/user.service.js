'use strict'
const {
    BadRequest,
    AuthRequest
} = require('../core/error.response')
const cloudinary = require('cloudinary').v2;
const userModel = require('../models/user.m')
const { getInfoData } = require('../utils/index')


class userService {
    // get info user
    static getInfo = async (id) => {
        const user = await userModel.getUserById({ id })
        if (user == undefined) {
            throw new BadRequest("User is not exits")
        }
        return getInfoData({
            fields: ['id', 'fullname', 'email', 'avatar'],
            object: user
        })
    }
    
    // update user
    static updateInfo = async ({ email, file, name }) => {
        const user = await userModel.getUser({ email })
        const newUser = user
        if (user == undefined) {
            throw new BadRequest("User is not exits")
        }

        if (name) {
            newUser.fullname = name;
        }

        // push image into cloudinary and get url.
        if (file) {
            const result = await cloudinary.uploader.upload(file.image.tempFilePath, {
                public_id: `${Date.now()}`,
                resource_type: "auto",
            })
            newUser.avatar = result.url
        }

        const isUpdated = await userModel.updateUser({ user: newUser });
        if (!isUpdated) {
            throw new BadRequest("update user failed")
        }

        return getInfoData({
            fields: ['id', 'fullname', 'email', 'avatar'],
            object: newUser
        })
    }
}

module.exports = userService