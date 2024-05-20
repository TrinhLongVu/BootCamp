'use strict'

const express = require('express')
const router = express.Router()
const planController = require('../../controllers/plan.c')
const { asyncHandler } = require('../../helpers/catch.asyns')
const isLogin = require('../../middleware/auth')
    
router.get('/hidden', isLogin, asyncHandler(planController.hiddenPlan))
router.get('/detail', isLogin, asyncHandler(planController.getDetailPlan))
router.get('/user', isLogin, asyncHandler(planController.getPlan))
router.post('/create', isLogin, asyncHandler(planController.createPlan))
router.post('/save', isLogin, asyncHandler(planController.savePlan))
router.post('/checkValid', isLogin, asyncHandler(planController.checkValid))
router.post('/viewAt', isLogin, asyncHandler(planController.viewAt))

module.exports = router