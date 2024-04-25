'use strict'

const express = require('express')
const router = express.Router()
const authenticateController = require('../../controllers/authenticate.c')
    
router.post('/shop/signup', authenticateController.signUp)

module.exports = router