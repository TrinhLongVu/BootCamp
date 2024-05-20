'use strict'

const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.c')
const { asyncHandler } = require('../../helpers/catch.asyns')
const isLogin = require('../../middleware/auth')
    
router.get('/getInfo/:id', isLogin, asyncHandler(userController.getInfo))
router.patch('/updateInfo', isLogin, asyncHandler(userController.updateInfo))

module.exports = router