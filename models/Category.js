const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true,
    maxlength: [50, 'Category name cannot exceed 50 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: {
      values: ['Active', 'Inactive'],
      message: 'Status must be one of: Active, Inactive'
    },
    default: 'Active'
  },
  image: {
    type: String, // Single image path
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
categorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
categorySchema.index({ status: 1 });

module.exports = mongoose.model('Category', categorySchema);