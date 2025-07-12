const mongoose=require('mongoose'); 

const courseSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required:true
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required:true
    }
    ,
    status: {
        type:String,
        required:true,
        enum: ['notStarted','started'], 
        default: 'notStarted'
    }
},{ timestamps: true }) ;

module.exports = mongoose.model('Course', courseSchema);