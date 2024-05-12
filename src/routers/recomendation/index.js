'use strict'

const express = require('express')
const router = express.Router()
const recomendation = require('../../controllers/lables.recommend.c')
const { asyncHandler } = require('../../helpers/catch.asyns')
const isLogin = require('../../middleware/auth')
    
router.get('/RcAccommodation', isLogin, asyncHandler(recomendation.RcAccommodation))

module.exports = router