const mongoose = require('mongoose');

// Cache the connection across serverless invocations
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  // Reuse an existing connection if mongoose already has one
  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    throw error; // let the request handler return a proper 500
  }
};

module.exports = connectDB;
