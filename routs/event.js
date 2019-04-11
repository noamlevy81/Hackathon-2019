const express = require("express")
const router = express.Router()

const eventController = require('../controllers/event')

router.post('/', eventController.postEvent)

router.get('/', eventController.getEvent)

module.exports = router


