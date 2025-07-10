const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('./models/userModel.js');

dotenv.config();

const createUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const username = 'instructor1';
    const email = 'instructor1@example.com';
    const password = 'ABCabc@123';
    const role = 'instructor';

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