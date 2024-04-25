const express = require('express')
const router = express.Router()

router.use('/v1/api', require('./authenticate'))

module.exports = router