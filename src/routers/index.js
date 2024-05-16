const express = require('express')
const router = express.Router()

router.use('/auth', require('./authenticate'))
router.use('/lables', require('./references'))
router.use('/users', require('./user'))
router.use('/plan', require('./plan'))

module.exports = router