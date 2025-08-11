const Doubt = require('../models/doubtModel');
const mongoose=require('mongoose');
const Lesson = require('../models/lessonModel');


//create doubt
const createDoubt = async (req, res) => {
    const { lessonId } = req.params;
    const { content,parentDoubt,status} = req.body;

    let emptyFields = [];

    if (!content) emptyFields.push('content');
    if (!lessonId) emptyFields.push('lessonId');

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }

    try {
        const doubt = await Doubt.create({
        content,
        lesson:lessonId,
        status,
        parentDoubt,
        });
        res.status(201).json(doubt);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// deleting a doubt
const deleteDoubt=async (req,res) => {
    const { doubtId } = req.params;

    try {
        const doubt = await Doubt.findById(doubtId);

        if (!doubt) {
            return res.status(404).json({ error: 'Doubt not found' });
        }

        await doubt.deleteOne(); 

        res.status(200).json(doubt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//get a single doubt
const getDoubt = async (req, res) => {
    const { doubtId } = req.params;

    try {
        const doubt = await Doubt.findById(doubtId)
        if (!doubt) {
            return res.status(404).json({ error: 'Doubt not found' });
        }
        res.status(200).json(doubt);
    } catch (error) {
        res.status(400).json({ error: 'Invalid doubt ID' });
    }
};

// edit a doubt
const editDoubt = async (req, res) => {
    const { doubtId } = req.params
    try{
        if (!mongoose.Types.ObjectId.isValid(doubtId)) {
            return res.status(404).json({error: 'No such doubt'})
        }

        const doubt = await Doubt.findOneAndUpdate({_id: doubtId}, {
            ...req.body
        }, {new:true})

        if (!doubt) {
            return res.status(404).json({error: 'No such doubt'})
        }

        res.status(200).json(doubt)
    }
    catch(error){
        return res.status(400).json({error:error.message});
    }
    
}

//viewing all doubts of a single lesson
const getDoubtsForLesson = async (req, res) => {
    const { lessonId } = req.params;

    try {
        const lesson = await Lesson.findById(lessonId);

        if (!lesson) {
        return res.status(404).json({ error: 'Lesson not found' });
        }
        const doubts = await Doubt.find({ lesson: lessonId }).sort({ createdAt: -1 });
        res.status(200).json({lesson:lesson,
        doubts:doubts
        });
    } catch (error) {
        res.status(400).json({ error: 'Invalid lesson ID' });
    }
};

module.exports={createDoubt,deleteDoubt,getDoubt,editDoubt,getDoubtsForLesson};