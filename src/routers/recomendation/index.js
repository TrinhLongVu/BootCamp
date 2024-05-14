'use strict'

const express = require('express')
const router = express.Router()
const recomendation = require('../../controllers/lables.recommend.c')
const { asyncHandler } = require('../../helpers/catch.asyns')
const isLogin = require('../../middleware/auth')
    
router.get('/RcAccommodation', isLogin, asyncHandler(recomendation.RcAccommodation))
router.get('/RcActivity', isLogin, asyncHandler(recomendation.RcActivity))
router.get('/RcTransport', isLogin, asyncHandler(recomendation.RcTransport))

module.exports = router