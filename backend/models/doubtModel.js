const mongoose=require('mongoose');

const doubtSchema=new mongoose.Schema({
    lesson:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Lesson',
        required:true
    },
    parentDoubt:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doubt',
        default:null
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['open', 'answered', 'closed'],
        default: 'open',
        index: true
    },
}, { timestamps: true })

doubtSchema.index({ lesson: 1, createdAt: -1 }); // Get recent doubts for a lesson
doubtSchema.index({ parentDoubt: 1, createdAt: 1 }); // Get replies for a doubt

module.exports = mongoose.model('Doubt', doubtSchema);
