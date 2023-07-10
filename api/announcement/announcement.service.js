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
        const collection = await dbService.getCollection('announcement')
        var announcement = await collection.find({}).toArray()
    //    console.log('announcements',announcement);
       
        return announcement

    } catch (err) {
        logger.error('cannot find announcement', err)
        throw err
    }
}

async function getById(announcementId) {
    try {
        const collection = await dbService.getCollection('announcement')
        const announcement = collection.findOne({ _id: ObjectId(announcementId) })
        return announcement
    } catch (err) {
        logger.error(`while finding announcement ${announcementId}`, err)
        throw err
    }
}

async function remove(announcementId) {
    try {
        const collection = await dbService.getCollection('announcement')
        await collection.deleteOne({ _id: ObjectId(announcementId) })
        return announcementId
    } catch (err) {
        logger.error(`cannot remove announcement ${announcementId}`, err)
        throw err
    }
}

async function add(announcement) {
    try {
        const collection = await dbService.getCollection('announcement')
        await collection.insertOne(announcement)
        // console.log('added this one :',announcement);
        
        return announcement
    } catch (err) {
        logger.error('cannot insert announcement', err)
        throw err
    }
}

async function update(announcement) {
    try {
        const announcementToSave = {
            comments: announcement.comments,

        }
        console.log('updatedAnnouncement in announcement controller',announcement);

        const collection = await dbService.getCollection('announcement')
        await collection.updateOne({ _id: ObjectId(announcement._id) }, { $set: announcementToSave })
        return announcement
    } catch (err) {
        logger.error(`cannot update announcement ${announcement._id}`, err)
        throw err
    }
}

async function addannouncementMsg(announcementId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('announcement')
        await collection.updateOne({ _id: ObjectId(announcementId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add announcement msg ${announcementId}`, err)
        throw err
    }
}

async function removeannouncementMsg(announcementId, msgId) {
    try {
        const collection = await dbService.getCollection('announcement')
        await collection.updateOne({ _id: ObjectId(announcementId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add announcement msg ${announcementId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addannouncementMsg,
    removeannouncementMsg
}
