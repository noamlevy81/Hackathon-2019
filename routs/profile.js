const express = require("express")
const router = express.Router()
const profileController = require('../controllers/profile.js')
const checkAuth = require('../middleware/checkAuth')

router.post('/signup', profileController.signup)

router.post('/login', profileController.login)

router.post('/enroll',checkAuth, profileController.enroll)

router.get('/myEvents', checkAuth, profileController.getEvents)


module.exports = router