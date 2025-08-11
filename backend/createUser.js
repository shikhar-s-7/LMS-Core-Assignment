const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('./models/userModel.js');
const mongouri="mongodb+srv://shikharsrivastava736:qURqCqShCM5aLpjF@lms-mern.5hpnyej.mongodb.net/?retryWrites=true&w=majority&"


dotenv.config();

const createUser = async () => {
  try {
    await mongoose.connect(mongouri);
    
    const username = 'student3';
    const email = 'student3@example.com';
    const password = 'ABCabc@123';
    const role = 'student';

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPassword, role });

    console.log(`${role} user created successfully:`, user);
    process.exit();
  } 
  catch (err) {
    console.error('Error creating user:', err.message);
    process.exit(1);
  }
};

createUser();