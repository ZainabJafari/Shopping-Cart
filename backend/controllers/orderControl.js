const router = require('express').Router()
const {getOrders, createOrder, getMyOrder} = require('../Model/orderModel')
const auth = require('../authentication/auth')


router.post('/', auth.verfyToken, createOrder)
router.get('/minaOrder', auth.verfyToken, getMyOrder )

// bara admin kan se alla orders
router.get('/allOrders',auth.verfyToken, auth.checkAdmin, getOrders )

module.exports = router;
