const router = require('express').Router()
const adminModel = require('../Model/adminModel')
const auth = require('../authentication/auth')


router.post('/register/admin', adminModel.createNewAdmin )
router.post('/login/admin', adminModel.loginAdmin )

module.exports = router;