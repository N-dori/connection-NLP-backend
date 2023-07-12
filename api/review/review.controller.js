const reviewService = require('./review.service.js')
const logger = require('../../services/logger.service.js')

async function getReview(req, res) {
  try {
    logger.debug('Getting Reviews')
    const filterBy = {
      txt: req.query.title || '',
    
    }
    console.log('filterBy',filterBy);
    
    const review = await reviewService.query(filterBy)    
    res.json(review)
  } catch (err) {
    logger.error('Failed to get reviews', err)
    res.status(500).send({ err: 'Failed to get reviews' })
  }
}

async function getReviewById(req, res) {
  try {
    const reviewId = req.params.id
    console.log('reviewId in review controller ',reviewId);
    const review = await reviewService.getById(reviewId)    
    res.json(review)
  } catch (err) {
    logger.error('Failed to get review', err)
    res.status(500).send({ err: 'Failed to get review' })
  }
}

async function addReview(req, res) {
  try {
    const review = req.body    
    
    const addedReview = await reviewService.add(review)
     

    console.log('review in controller',addedReview);
    res.json(addedReview)
  } catch (err) {
    logger.error('Failed to add review', err)
    res.status(500).send({ err: 'Failed to add review' })
  }
}


async function updateReview(req, res) {
  try {
    const review = req.body
    
    console.log('updatedReview in review controller',review);
    const updatedReview = await reviewService.update(review)    
    console.log('updatedReview in couse controller',updatedReview);
    
    res.json(updatedReview)
  } catch (err) {
    logger.error('Failed to update review', err)
    res.status(500).send({ err: 'Failed to update review' })

  }
}

async function removeReview(req, res) {
  try {
    const reviewId = req.params.id
    const removedId = await reviewService.remove(reviewId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove review', err)
    res.status(500).send({ err: 'Failed to remove review' })
  }
}

async function addReviewMsg(req, res) {
  const {loggedinUser} = req
  try {
    const reviewId = req.params.id
    const msg = {
      txt: req.body.txt,
      by: loggedinUser
    }
    const savedMsg = await reviewService.addReviewMsg(reviewId, msg)
    res.json(savedMsg)
  } catch (err) {
    logger.error('Failed to update review', err)
    res.status(500).send({ err: 'Failed to update review' })

  }
}

async function removeReviewMsg(req, res) {
  const {loggedinUser} = req
  try {
    const reviewId = req.params.id
    const {msgId} = req.params

    const removedId = await reviewService.removeReviewMsg(reviewId, msgId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove review msg', err)
    res.status(500).send({ err: 'Failed to remove review msg' })

  }
}

module.exports = {
  getReview,
  getReviewById,
  addReview,
  updateReview,
  removeReview,
  addReviewMsg,
  removeReviewMsg
}
