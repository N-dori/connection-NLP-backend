const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getAnnouncement, getAnnouncementById, addAnnouncement, updateAnnouncement, removeAnnouncement, addAnnouncementMsg, removeAnnouncementMsg } = require('./announcement.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getAnnouncement)
router.get('/:id', getAnnouncementById)
router.post('/', /* requireAuth,  */addAnnouncement)
router.put('/',/*  requireAuth, */ updateAnnouncement)
router.delete('/:id', /* requireAuth ,*/ removeAnnouncement)
// router.delete('/:id', requireAuth, requireAdmin, removeAnnouncement)

// router.post('/:id/msg', requireAuth, addAnnouncementMsg)
// router.delete('/:id/msg/:msgId', requireAuth, removeAnnouncementMsg)

module.exports = router