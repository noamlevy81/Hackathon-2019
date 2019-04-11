const express = require("express")
const router = express.Router()
const profileController = require('../controllers/profile.js')

router.post('/signup', profileController.signup)

router.post('/login', profileController.login)

router.post('/enroll', profileController.enroll)

module.exports = router