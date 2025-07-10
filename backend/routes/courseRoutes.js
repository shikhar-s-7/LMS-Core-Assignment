const express = require('express');
const { createCourse,deleteCourse, getCourse, getCourses } = require('../controllers/courseController');
const { requireAuth } = require('../middleware/requireAuth');
const { isInstructor } = require('../middleware/roleMiddleware.js');

const router = express.Router();

// make a new course
router.post('/', requireAuth, isInstructor,createCourse);

//delete a new course
router.delete('/:id', requireAuth, isInstructor, deleteCourse);

//get all courses for instructor
router.get('/', requireAuth, isInstructor, getCourses);

//get a single course for instructor
router.get('/course/:id', requireAuth, isInstructor, getCourse);



module.exports = router;