'use strict'

const express = require('express')
const router = express.Router()
const planController = require('../../controllers/plan.c')
const { asyncHandler } = require('../../helpers/catch.asyns')
const isLogin = require('../../middleware/auth')
    
router.get('/hidden', isLogin, asyncHandler(planController.hiddenPlan))

module.exports = router