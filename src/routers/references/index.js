'use strict'

const express = require('express')
const router = express.Router()
const recomendation = require('../../controllers/references.c')
const { asyncHandler } = require('../../helpers/catch.asyns')
const isLogin = require('../../middleware/auth')
    
router.get('/RcAccommodation', asyncHandler(recomendation.RcAccommodation))
router.get('/RcActivity', asyncHandler(recomendation.RcActivity))
router.get('/RcTransport', asyncHandler(recomendation.RcTransport))

module.exports = router