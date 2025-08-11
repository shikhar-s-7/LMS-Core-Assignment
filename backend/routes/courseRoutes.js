const express = require('express');
const {createCourse,deleteCourse, getCourse, getCourses, updateCourse,getAllCourses} = require('../controllers/courseController');
const {requireAuth} = require('../middleware/requireAuth');
const {isInstructor, isAdmin} = require('../middleware/roleMiddleware.js');
const lessonRoutes=require('./lessonRoutes.js')

const router = express.Router();

// make a new course
router.post('/', requireAuth, isInstructor,createCourse);

//delete a new course
router.delete('/:id', requireAuth, isInstructor, deleteCourse);

//get all courses for instructor
router.get('/', requireAuth, isInstructor, getCourses);

//get all lessons for a single course for instructor
router.get('/course/:id', requireAuth, isInstructor, getCourse);

//get all courses regardless of instructor
router.get('/all',requireAuth,isAdmin,getAllCourses)

//update a course for instructor
router.patch('/course/:id', requireAuth, isInstructor, updateCourse);

router.use('/course/:id/lessons',requireAuth,isInstructor,lessonRoutes)

module.exports = router;