const express = require('express')
const router = express.Router()

router.use('/v1/api/auth', require('./authenticate'))
router.use('/v1/api/lables', require('./recomendation'))

module.exports = router