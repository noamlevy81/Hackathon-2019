const express = require("express")
const router = express.Router()
const profileController = require('../controllers/profile.js')
<<<<<<< HEAD
const checkAuth = require('../middleware/checkAuth.js')

=======
const checkAuth = require('../middleware/checkAuth')
>>>>>>> d81b391afc84326bdb6ec0870afbaaf95acda84b
router.post('/signup', profileController.signup)

router.post('/login', profileController.login)

router.post('/login/facebook', profileController.loginWithFacebook)

router.post('/enroll',checkAuth, profileController.enroll)

module.exports = router