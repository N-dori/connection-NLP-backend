const announcementService = require('./announcement.service.js')

const logger = require('../../services/logger.service.js')

async function getAnnouncement(req, res) {
  try {
    logger.debug('Getting Announcements')
    const filterBy = {
      txt: req.query.title || '',
    
    }
    console.log('filterBy',filterBy);
    
    const announcement = await announcementService.query(filterBy)    
    res.json(announcement)
  } catch (err) {
    logger.error('Failed to get announcements', err)
    res.status(500).send({ err: 'Failed to get announcements' })
  }
}

async function getAnnouncementById(req, res) {
  try {
    const announcementId = req.params.id
    console.log('announcementId in announcement controller ',announcementId);
    const announcement = await announcementService.getById(announcementId)    
    res.json(announcement)
  } catch (err) {
    logger.error('Failed to get announcement', err)
    res.status(500).send({ err: 'Failed to get announcement' })
  }
}

async function addAnnouncement(req, res) {
  try {
    const announcement = req.body    
    
    const addedAnnouncement = await announcementService.add(announcement)
    console.log('announcement in controller',addedAnnouncement);
    res.json(addedAnnouncement)
  } catch (err) {
    logger.error('Failed to add announcement', err)
    res.status(500).send({ err: 'Failed to add announcement' })
  }
}


async function updateAnnouncement(req, res) {
  try {
    const announcement = req.body
    
    console.log('updatedAnnouncement in announcement controller',announcement);
    const updatedAnnouncement = await announcementService.update(announcement)    
    console.log('updatedAnnouncement in couse controller',updatedAnnouncement);
    
    res.json(updatedAnnouncement)
  } catch (err) {
    logger.error('Failed to update announcement', err)
    res.status(500).send({ err: 'Failed to update announcement' })

  }
}

async function removeAnnouncement(req, res) {
  try {
    const announcementId = req.params.id
    const removedId = await announcementService.remove(announcementId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove announcement', err)
    res.status(500).send({ err: 'Failed to remove announcement' })
  }
}

async function addAnnouncementMsg(req, res) {
  const {loggedinUser} = req
  try {
    const announcementId = req.params.id
    const msg = {
      txt: req.body.txt,
      by: loggedinUser
    }
    const savedMsg = await announcementService.addAnnouncementMsg(announcementId, msg)
    res.json(savedMsg)
  } catch (err) {
    logger.error('Failed to update announcement', err)
    res.status(500).send({ err: 'Failed to update announcement' })

  }
}

async function removeAnnouncementMsg(req, res) {
  const {loggedinUser} = req
  try {
    const announcementId = req.params.id
    const {msgId} = req.params

    const removedId = await announcementService.removeAnnouncementMsg(announcementId, msgId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove announcement msg', err)
    res.status(500).send({ err: 'Failed to remove announcement msg' })

  }
}

module.exports = {
  getAnnouncement,
  getAnnouncementById,
  addAnnouncement,
  updateAnnouncement,
  removeAnnouncement,
  addAnnouncementMsg,
  removeAnnouncementMsg
}
