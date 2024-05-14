const express = require('express')
const router = express.Router()

router.use('/auth', require('./authenticate'))
router.use('/lables', require('./recomendation'))

module.exports = router