const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getReview, getReviewById, addReview, updateReview, removeReview, addReviewMsg, removeReviewMsg } = require('./review.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getReview)
router.get('/:id', getReviewById)
router.post('/', /* requireAuth,  */addReview)
router.put('/',/*  requireAuth, */ updateReview)
router.delete('/:id', /* requireAuth ,*/ removeReview)
// router.delete('/:id', requireAuth, requireAdmin, removeReview)

// router.post('/:id/msg', requireAuth, addReviewMsg)
// router.delete('/:id/msg/:msgId', requireAuth, removeReviewMsg)

module.exports = router