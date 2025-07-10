const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true,
        trim:true
    }
    ,
    role: {
        type:String,
        enum:['student','instructor','admin'],
        default: 'student'
    }
})


//static login
userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
    throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports=mongoose.model('User',userSchema);