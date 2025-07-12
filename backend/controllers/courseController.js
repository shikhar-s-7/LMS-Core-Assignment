const Course = require('../models/courseModel');
const Lesson = require('../models/lessonModel');
const mongoose=require('mongoose');

//create course
const createCourse = async (req, res) => {
  const { title, description, status} = req.body;

  let emptyFields = [];

  if (!title) emptyFields.push('title');
  if (!description) emptyFields.push('description');
  if (!status) emptyFields.push('status');

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  try {
    const instructor = req.user._id;
    const course = await Course.create({
      title,
      description,
      status,
      instructor
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete course
const deleteCourse=async (req,res) =>{
  const { id } = req.params;

  try {
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized to delete this course' });
    }

    await course.deleteOne(); 

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//viewing a single course
const getCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id).populate('instructor', 'username email');

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    const lessons = await Lesson.find({ course: id }).sort({ order: 1 });
    res.status(200).json({course:course,
      lessons:lessons
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid course ID' });
  }
};

//viewing all courses 
const getCourses = async (req, res) => {
  try {
    const { role, _id } = req.user;

    let courses;

    if (role === 'instructor') {
      courses = await Course.find({ instructor: _id });
    } else if (role === 'admin') {
      courses = await Course.find(); // get all
    } else {
      // student
    }

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update a course
const updateCourse = async (req, res) => {
  const { id } = req.params
  try{
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such course'})
    }

    const course = await Course.findOneAndUpdate({_id: id}, {
      ...req.body
    }, {new:true})

    if (!course) {
      return res.status(404).json({error: 'No such course'})
    }

    res.status(200).json(course)
  }
  catch(error){
    return res.status(400).json({error:error.message});
  }
  
}

module.exports = { createCourse,deleteCourse,getCourse,getCourses,updateCourse };
