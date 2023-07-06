//1בסד

const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy = { txt: ''}) {
    try {
        const criteria = {
            title: { $regex: filterBy.txt, $options: 'i' }
        }
        const collection = await dbService.getCollection('coures')
        var coures = await collection.find({}).toArray()
    //    console.log('courses',coures);
       
        return coures

    } catch (err) {
        logger.error('cannot find coures', err)
        throw err
    }
}

async function getById(couresId) {
    try {

        const collection = await dbService.getCollection('coures')
        const coures = collection.findOne({ _id: ObjectId(couresId) })
        return coures
    } catch (err) {
        logger.error(`while finding coures ${couresId}`, err)
        throw err
    }
}

async function remove(couresId) {
    try {
        const collection = await dbService.getCollection('coures')
        await collection.deleteOne({ _id: ObjectId(couresId) })
        return couresId
    } catch (err) {
        logger.error(`cannot remove coures ${couresId}`, err)
        throw err
    }
}

async function add(coures) {
    try {
        const collection = await dbService.getCollection('coures')
        await collection.insertOne(coures)

        return coures
    } catch (err) {
        logger.error('cannot insert coures', err)
        throw err
    }
}

async function update(coures) {
    try {
        const couresToSave = {
            name: coures.name,
            price: coures.price
        }
        const collection = await dbService.getCollection('coures')
        await collection.updateOne({ _id: ObjectId(coures._id) }, { $set: couresToSave })
        return coures
    } catch (err) {
        logger.error(`cannot update coures ${couresId}`, err)
        throw err
    }
}

async function addCouresMsg(couresId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('coures')
        await collection.updateOne({ _id: ObjectId(couresId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add coures msg ${couresId}`, err)
        throw err
    }
}

async function removeCouresMsg(couresId, msgId) {
    try {
        const collection = await dbService.getCollection('coures')
        await collection.updateOne({ _id: ObjectId(couresId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add coures msg ${couresId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addCouresMsg,
    removeCouresMsg
}
