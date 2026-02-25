const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { uploadPropertyImages } = require('../middleware/upload');
const { validateProperty } = require('../middleware/validation');


router.get('/', propertyController.getAllProperties);

router.get('/:id', propertyController.getPropertyById);

router.post('/',
  uploadPropertyImages.array('images', 3), 
  validateProperty,
  propertyController.createProperty
);

router.put('/:id',
  uploadPropertyImages.array('images', 3), 
  validateProperty,
  propertyController.updateProperty
);

router.delete('/:id', propertyController.deleteProperty);

router.delete('/:id/images/:imageIndex', propertyController.removePropertyImage);

module.exports = router;