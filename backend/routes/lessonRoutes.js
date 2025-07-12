const express = require('express');
const { createLesson, deleteLesson, updateLesson, getLesson } = require('../controllers/lessonController');
const router = express.Router({ mergeParams: true });

//create a lesson
router.post('/',createLesson);

//delete a lesson
router.delete('/:lessonId',deleteLesson);

//update a lesson
router.patch('/:lessonId',updateLesson);

//get a lesson
router.get('/:lessonId',getLesson);

module.exports=router;


