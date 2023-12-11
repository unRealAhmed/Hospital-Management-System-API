const express = require('express')
const { signUp, login, forgetPassword, resetPassword, protect, updatePassword } = require('../controllers/userController')

const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)
router.post('/forgetPassword', forgetPassword)
router.patch('/resetPassword/:token', resetPassword)

router.use(protect)

router.patch('/updatePassword', updatePassword)

module.exports = router