'use strict'

const express = require('express')
const router = express.Router()
const authenticateController = require('../../controllers/authenticate.c')
const { asyncHandler } = require('../../helpers/catch.asyns')
    
router.post('/signup', asyncHandler(authenticateController.signUp))
router.post('/login', asyncHandler(authenticateController.login))

module.exports = router