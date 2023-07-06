const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const dbService = require('../../services/db.service')
const orderService = require('../order/order.service')
const logger = require('../../services/logger.service')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')
const ObjectId = require('mongodb').ObjectId
const socketService= require('../../services/socket.service')
module.exports = {
    query,
    addOrder,
    update,
    getById,
}

async function query() {

    try {
        const collection = await dbService.getCollection('order')
        var orders = await collection.find({}).toArray()
        
        return orders
    }

    catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}
async function getById(orderId) {
    try {

        const collection = await dbService.getCollection('order')
        const order = collection.findOne({ _id: ObjectId(orderId) })
        return order
    } catch (err) {
        logger.error(`while finding order ${orderId}`, err)
        throw err
    }
}
async function update(order) {

    try {
        const orderToSave = {
            status: order.status,
        }
        console.log('order.status',order.status);
        
        socketService.emit('update-order',order.status)
        const collection = await dbService.getCollection('order')
        await collection.updateOne(
            { _id: ObjectId(order._id) }
            ,{ $set: orderToSave }
        )

        return order
    }
    catch (err) {
        logger.error(`cannot update order ${order._id}`, err)
        throw err

    }
}
async function addOrder(order) {
    try {
        // peek only updatable fields!
        const orderToAdd = {
            hostId: order.hostId,
            buyer: {
                _id: order.buyer._id,
                fullname: order.buyer.fullname,
                img: order.buyer.img,
            },
            totalGuests: order.totalGuests,
            totalPrice: order.totalPrice,
            startDate: order.startDate,
            endDate: order.endDate,
            nigths: order.nigths,
            status: order.status,

            guests: {
                adults: order.guests.adults,
                kids: order.guests.kids,
                infants: order.guests.infants,
                pets: order.guests.pets,
            },
            stay: {
                _id: order.stay._id,
                name: order.stay.name,
                price: order.stay.price,
                img: order.stay.img,
            }
        }

        const collection = await dbService.getCollection('order')
        await collection.insertOne(orderToAdd)
        return orderToAdd
    } catch (err) {
        logger.error('cannot add order', err)
        throw err
    }
}
