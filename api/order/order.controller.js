const orderService = require('./order.service')
const logger = require('../../services/logger.service')
async function getOrders(req, res) {
    try {
        const orders = await orderService.query()
        console.log('req.params',req.params);
        console.log('req.params',req.params.id);
        
        res.send(orders)
    } catch (err) {
        logger.error('Failed to get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}
async function getOrderById(req, res) {
  try {
    const orderId = req.params.id
    console.log('orderrrrrrrrrrrrrrrrrrr   iddddd',orderId);
    const order = await orderService.getById(orderId)    
    
    res.json(order)
  } catch (err) {
    logger.error('Failed to get order', err)
    res.status(500).send({ err: 'Failed to get order' })
  }
}
async function addOrder(req, res) {
    try {
        const order = req.body
        // order.owner = loggedinUser        
        const addedOrder = await orderService.addOrder(order)
        res.json(addedOrder)
      } catch (err) {
        logger.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
      }
}

async function updateOrder(req, res) {
    try {
        const order = req.body
        const updatedOrder = await orderService.update(order)  
        // sockt here  
        console.log('updatedOrder in conttroller',updatedOrder);
        
        res.json(updatedOrder)
      } catch (err) {
        logger.error('Failed to update order', err)
        res.status(500).send({ err: 'Failed to update order' })
    
      }
       
}


module.exports = {
    addOrder,
    getOrderById,
    getOrders,
    updateOrder,
}