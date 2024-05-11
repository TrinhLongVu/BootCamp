'use strict'

const express = require('express')
const router = express.Router()
const authenticateController = require('../../controllers/authenticate.c')
const { asyncHandler } = require('../../helpers/catch.asyns')
    
router.post('/user/signup', asyncHandler(authenticateController.signUp))

module.exports = router