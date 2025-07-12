const Lesson = require('../models/lessonModel');
const mongoose=require('mongoose');

//create lesson
const createLesson = async (req, res) => {
    const { id } = req.params;
    const { title, videoUrl,order,resources} = req.body;

    let emptyFields = [];

    if (!title) emptyFields.push('title');
    if (!id) emptyFields.push('course');
    if (!videoUrl) emptyFields.push('videoUrl');

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }

    try {
        const lesson = await Lesson.create({
        title,
        course:id,
        videoUrl,
        order,
        resources
        });
        res.status(201).json(lesson);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// deleting a lesson
const deleteLesson=async (req,res) => {
    const { lessonId } = req.params;

    try {
        const lesson = await Lesson.findById(lessonId);

        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }

        await lesson.deleteOne(); 

        res.status(200).json(lesson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//viewing a single lesson
const getLesson = async (req, res) => {
    const { lessonId } = req.params;

    try {
        const lesson = await Lesson.findById(lessonId)
        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }
        res.status(200).json(lesson);
    } catch (error) {
        res.status(400).json({ error: 'Invalid lesson ID' });
    }
};

// update a lesson
const updateLesson = async (req, res) => {
    const { lessonId } = req.params
    try{
        if (!mongoose.Types.ObjectId.isValid(lessonId)) {
            return res.status(404).json({error: 'No such lesson'})
        }

        const lesson = await Lesson.findOneAndUpdate({_id: lessonId}, {
            ...req.body
        }, {new:true})

        if (!lesson) {
            return res.status(404).json({error: 'No such lesson'})
        }

        res.status(200).json(lesson)
    }
    catch(error){
        return res.status(400).json({error:error.message});
    }
    
}

module.exports={createLesson,deleteLesson,getLesson,updateLesson};