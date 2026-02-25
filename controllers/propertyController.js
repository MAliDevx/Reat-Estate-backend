const Property = require('../models/Property');
const { validationResult } = require('express-validator');
const { uploadToCloudinary } = require('../middleware/upload');

exports.getAllProperties = async (req, res, next) => {
  try {
    const { category, status, location, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (location) filter.location = { $regex: location, $options: 'i' };

    const skip = (page - 1) * limit;

    const properties = await Property.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Property.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: properties,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalProperties: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    next(error);
  }
};

exports.createProperty = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const propertyData = { ...req.body };

    // Handle image uploads to Cloudinary
    if (req.files && req.files.images && req.files.images.length > 0) {
      const imageUrls = [];
      for (const file of req.files.images) {
        const url = await uploadToCloudinary(file, 'real-estate/properties');
        imageUrls.push(url);
      }
      propertyData.images = imageUrls;
    }

    // Handle video upload to Cloudinary
    if (req.files && req.files.video && req.files.video.length > 0) {
      const videoUrl = await uploadToCloudinary(req.files.video[0], 'real-estate/properties');
      propertyData.video = videoUrl;
    }

    const property = await Property.create(propertyData);

    res.status(201).json({
      success: true,
      data: property,
      message: 'Property created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Update property
exports.updateProperty = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const propertyData = { ...req.body };
    const existingProperty = await Property.findById(req.params.id);

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Handle image uploads to Cloudinary (append to existing images)
    if (req.files && req.files.images && req.files.images.length > 0) {
      const newImageUrls = [];
      for (const file of req.files.images) {
        const url = await uploadToCloudinary(file, 'real-estate/properties');
        newImageUrls.push(url);
      }
      propertyData.images = [...(existingProperty.images || []), ...newImageUrls];
    }

    // Handle video upload to Cloudinary (replace existing video)
    if (req.files && req.files.video && req.files.video.length > 0) {
      const videoUrl = await uploadToCloudinary(req.files.video[0], 'real-estate/properties');
      propertyData.video = videoUrl;
    }

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      propertyData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: property,
      message: 'Property updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Delete property
exports.deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Remove specific image from property
exports.removePropertyImage = async (req, res, next) => {
  try {
    const { imageIndex } = req.params;
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    if (!property.images || property.images.length <= imageIndex) {
      return res.status(400).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Remove the image from the array
    property.images.splice(imageIndex, 1);
    await property.save();

    res.status(200).json({
      success: true,
      data: property,
      message: 'Image removed successfully'
    });
  } catch (error) {
    next(error);
  }
};