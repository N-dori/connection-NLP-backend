const courseService = require('./course.service.js')

const logger = require('../../services/logger.service.js')

async function getCoures(req, res) {
  try {
    logger.debug('Getting Couress')
    const filterBy = {
      txt: req.query.title || '',
    
    }
    console.log('filterBy',filterBy);
    
    const coures = await courseService.query(filterBy)    
    res.json(coures)
  } catch (err) {
    logger.error('Failed to get couress', err)
    res.status(500).send({ err: 'Failed to get couress' })
  }
}

async function getCouresById(req, res) {
  try {
    const couresId = req.params.id
    console.log('couresId in course controller ',couresId);
    const coures = await courseService.getById(couresId)    
    res.json(coures)
  } catch (err) {
    logger.error('Failed to get coures', err)
    res.status(500).send({ err: 'Failed to get coures' })
  }
}

async function addCoures(req, res) {
  try {
    const coures = req.body    
    
    const addedCoures = await courseService.add(coures)
    console.log('coures in controller',addedCoures);
    res.json(addedCoures)
  } catch (err) {
    logger.error('Failed to add coures', err)
    res.status(500).send({ err: 'Failed to add coures' })
  }
}


async function updateCoures(req, res) {
  try {
    const course = req.body
    console.log('updatedCourse in course controller',course);
    const updatedCourse = await courseService.update(course)    
    console.log('updatedCourse in couse controller',updatedCourse);
    
    res.json(updatedCourse)
  } catch (err) {
    logger.error('Failed to update course', err)
    res.status(500).send({ err: 'Failed to update course' })

  }
}

async function removeCoures(req, res) {
  try {
    const couresId = req.params.id
    const removedId = await courseService.remove(couresId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove coures', err)
    res.status(500).send({ err: 'Failed to remove coures' })
  }
}

async function addCouresMsg(req, res) {
  const {loggedinUser} = req
  try {
    const couresId = req.params.id
    const msg = {
      txt: req.body.txt,
      by: loggedinUser
    }
    const savedMsg = await courseService.addCouresMsg(couresId, msg)
    res.json(savedMsg)
  } catch (err) {
    logger.error('Failed to update coures', err)
    res.status(500).send({ err: 'Failed to update coures' })

  }
}

async function removeCouresMsg(req, res) {
  const {loggedinUser} = req
  try {
    const couresId = req.params.id
    const {msgId} = req.params

    const removedId = await courseService.removeCouresMsg(couresId, msgId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove coures msg', err)
    res.status(500).send({ err: 'Failed to remove coures msg' })

  }
}

module.exports = {
  getCoures,
  getCouresById,
  addCoures,
  updateCoures,
  removeCoures,
  addCouresMsg,
  removeCouresMsg
}
