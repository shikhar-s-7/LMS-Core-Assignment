const express=require('express');
const { createDoubt, deleteDoubt, editDoubt, getDoubt,getDoubtsForLesson } = require('../controllers/doubtController');

//router
const router = express.Router({ mergeParams: true });

//create a doubt
router.post('/',createDoubt);

//delete a doubt
router.delete('/:doubtId',deleteDoubt);

//edit a doubt
router.patch('/:doubtId',editDoubt);

//get a doubt // for notification later
router.get('/:doubtId',getDoubt);

//get all doubts for a lesson
router.get('/', getDoubtsForLesson);

module.exports=router;
