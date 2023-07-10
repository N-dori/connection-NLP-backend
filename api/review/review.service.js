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
        const collection = await dbService.getCollection('review')
        var review = await collection.find({}).toArray()
    //    console.log('reviews',review);
       
        return review

    } catch (err) {
        logger.error('cannot find review', err)
        throw err
    }
}

async function getById(reviewId) {
    try {
        const collection = await dbService.getCollection('review')
        const review = collection.findOne({ _id: ObjectId(reviewId) })
        return review
    } catch (err) {
        logger.error(`while finding review ${reviewId}`, err)
        throw err
    }
}

async function remove(reviewId) {
    try {
        const collection = await dbService.getCollection('review')
        await collection.deleteOne({ _id: ObjectId(reviewId) })
        return reviewId
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}

async function add(review) {
    try {
        const collection = await dbService.getCollection('review')
        await collection.insertOne(review)
        // console.log('added this one :',review);
        
        return review
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

async function update(review) {
    try {
        const reviewToSave = {
            comments: review.comments,

        }
        console.log('updatedReview in review controller',review);

        const collection = await dbService.getCollection('review')
        await collection.updateOne({ _id: ObjectId(review._id) }, { $set: reviewToSave })
        return review
    } catch (err) {
        logger.error(`cannot update review ${review._id}`, err)
        throw err
    }
}

async function addreviewMsg(reviewId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('review')
        await collection.updateOne({ _id: ObjectId(reviewId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add review msg ${reviewId}`, err)
        throw err
    }
}

async function removereviewMsg(reviewId, msgId) {
    try {
        const collection = await dbService.getCollection('review')
        await collection.updateOne({ _id: ObjectId(reviewId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add review msg ${reviewId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addreviewMsg,
    removereviewMsg
}
