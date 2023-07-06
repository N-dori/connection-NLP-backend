const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getCoures, getCouresById, addCoures, updateCoures, removeCoures, addCouresMsg, removeCouresMsg } = require('./coures.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getCoures)
router.get('/:id', getCouresById)
router.post('/', /* requireAuth,  */addCoures)
router.put('/:id',/*  requireAuth, */ updateCoures)
router.delete('/:id', /* requireAuth ,*/ removeCoures)
// router.delete('/:id', requireAuth, requireAdmin, removeCoures)

// router.post('/:id/msg', requireAuth, addCouresMsg)
// router.delete('/:id/msg/:msgId', requireAuth, removeCouresMsg)

module.exports = router