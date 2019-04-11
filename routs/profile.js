const express = require("express")
const router = express.Router()
const profileController = require('../controllers/profile.js')
const checkAuth = require('../middleware/checkAuth.js')

router.post('/signup', profileController.signup)

router.post('/login', profileController.login)

router.post('/login/facebook', profileController.loginWithFacebook)

router.post('/enroll',checkAuth, profileController.enroll)

module.exports = router