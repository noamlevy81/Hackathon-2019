const express = require("express")
const router = express.Router()
const checkAuth = require('../middleware/checkAuth')
const eventController = require('../controllers/event')

router.post('/', checkAuth, eventController.postEvent)

router.get('/', eventController.getEvent)

module.exports = router


