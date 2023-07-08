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
        const collection = await dbService.getCollection('course')
        var course = await collection.find({}).toArray()
    //    console.log('courses',course);
       
        return course

    } catch (err) {
        logger.error('cannot find course', err)
        throw err
    }
}

async function getById(courseId) {
    try {
        const collection = await dbService.getCollection('course')
        const course = collection.findOne({ _id: ObjectId(courseId) })
        return course
    } catch (err) {
        logger.error(`while finding course ${courseId}`, err)
        throw err
    }
}

async function remove(courseId) {
    try {
        const collection = await dbService.getCollection('course')
        await collection.deleteOne({ _id: ObjectId(courseId) })
        return courseId
    } catch (err) {
        logger.error(`cannot remove course ${courseId}`, err)
        throw err
    }
}

async function add(course) {
    try {
        const collection = await dbService.getCollection('course')
        await collection.insertOne(course)
        // console.log('added this one :',course);
        
        return course
    } catch (err) {
        logger.error('cannot insert course', err)
        throw err
    }
}

async function update(course) {
    try {
        const courseToSave = {
            cart: course.cart,
            students: course.students
        }
        console.log('updatedCourse in course controller',course);

        const collection = await dbService.getCollection('course')
        await collection.updateOne({ _id: ObjectId(course._id) }, { $set: courseToSave })
        return course
    } catch (err) {
        logger.error(`cannot update course ${course._id}`, err)
        throw err
    }
}

async function addcourseMsg(courseId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('course')
        await collection.updateOne({ _id: ObjectId(courseId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add course msg ${courseId}`, err)
        throw err
    }
}

async function removecourseMsg(courseId, msgId) {
    try {
        const collection = await dbService.getCollection('course')
        await collection.updateOne({ _id: ObjectId(courseId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add course msg ${courseId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addcourseMsg,
    removecourseMsg
}
