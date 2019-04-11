const express = require("express")
const router = express.Router()
const eventController = require('../controllers/event')
const checkAuth = require('../middleware/checkAuth.js')

router.post('/', checkAuth, eventController.postEvent)

router.get('/', eventController.getEvent)

module.exports = router
