const express = require('express')
const { loginUser,getUser} = require('../controllers/userController.js')
const {requireAuth}=require('../middleware/requireAuth.js')

const router = express.Router()

// login route
router.post('/login', loginUser)

//get user details
router.get('/me',requireAuth,getUser)

module.exports = router