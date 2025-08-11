const express = require('express')
const { loginUser,getUser,getAllStudents} = require('../controllers/userController.js')
const {requireAuth}=require('../middleware/requireAuth.js')
const {isAdmin }=require('../middleware/roleMiddleware.js')

const router = express.Router()

// login route
router.post('/login', loginUser)

//get user details
router.get('/me',requireAuth,getUser)

//get all students
router.get('/students',requireAuth,isAdmin,getAllStudents)

module.exports = router