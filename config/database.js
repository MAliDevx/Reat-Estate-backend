const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGODB_URL);

    const conn = await mongoose.connect(process.env.MONGODB_URL);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Server will continue but DB operations will fail until reconnected.');
  }
};

module.exports = connectDB; /// use this in main ; connectDB()