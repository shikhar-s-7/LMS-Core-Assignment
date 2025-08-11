const express = require('express');
const { createLesson, deleteLesson, updateLesson, getLesson } = require('../controllers/lessonController');
const router = express.Router({ mergeParams: true });
const doubtRoutes=require('./doubtRoutes.js')


//create a lesson
router.post('/',createLesson);

//delete a lesson
router.delete('/:lessonId',deleteLesson);

//update a lesson
router.patch('/:lessonId',updateLesson);

//get a lesson
router.get('/:lessonId',getLesson);

//other doubts routes
router.use('/:lessonId/doubts',doubtRoutes)


module.exports=router;


