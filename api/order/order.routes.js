const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')

const {getOrders, addOrder,updateOrder,getOrderById} = require('./order.controller')

const router = express.Router()

router.get('/', getOrders)
router.get('/:id', getOrderById)
router.post('/', addOrder)
router.put('/:id', updateOrder)


module.exports = router