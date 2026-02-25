const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

const propertyFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed!'), false);
  }
};

const categoryFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const uploadPropertyImages = multer({
  storage: storage,
  fileFilter: propertyFileFilter,

});

const uploadCategoryImage = multer({
  storage: storage,
  fileFilter: categoryFileFilter,

});

const uploadToCloudinary = async (file, folder) => {
  try {
    let fileBuffer = file.buffer;
    let resourceType = 'image';

    if (file.mimetype.startsWith('image/')) {
      fileBuffer = await sharp(file.buffer)
        .resize({ width: 1920 })
        .webp({ quality: 75 })         
        .toBuffer();

      resourceType = 'image';
    }

    if (file.mimetype.startsWith('video/')) {
      resourceType = 'video';
    }

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      );

      stream.end(fileBuffer);
    });

  } catch (error) {
    throw error;
  }
};

module.exports = {
  uploadPropertyImages,
  uploadCategoryImage,
  uploadToCloudinary
};