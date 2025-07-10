const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '5d' })
}

// login a user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)
    
    res.status(200).json({ email, token, role: user.role, username:user.username });
    console.log(`user of role ${user.role} logged in`);
    } 
    catch (error) {
    res.status(400).json({error: error.message})
    }
}

const getUser=async (req,res)=>{
    try {
        res.status(200).json(req.user);
    } 
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports={loginUser,getUser};