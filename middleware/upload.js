const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage for multer
const storage = multer.memoryStorage();

// File filter for properties (images and videos)
const propertyFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed!'), false);
  }
};

// File filter for categories (images only)
const categoryFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Property upload (multiple images and optional video)
const uploadPropertyImages = multer({
  storage: storage,
  fileFilter: propertyFileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit for videos
    files: 11 // Maximum 10 images + 1 video
  }
});

// Category upload (single image)
const uploadCategoryImage = multer({
  storage: storage,
  fileFilter: categoryFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1 // Only 1 file
  }
});

// Function to upload file to Cloudinary
const uploadToCloudinary = (file, folder) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: folder,
      resource_type: file.mimetype.startsWith('video/') ? 'video' : 'image',
      transformation: file.mimetype.startsWith('image/') ? [
        { width: 1000, height: 1000, crop: 'limit' }
      ] : undefined
    };

    const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.secure_url);
      }
    });

    stream.end(file.buffer);
  });
};

module.exports = {
  uploadPropertyImages,
  uploadCategoryImage,
  uploadToCloudinary
};