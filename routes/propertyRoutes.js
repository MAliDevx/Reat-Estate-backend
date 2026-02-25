const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { uploadPropertyImages } = require('../middleware/upload');
const { validateProperty } = require('../middleware/validation');


router.get('/', propertyController.getAllProperties);

router.get('/:id', propertyController.getPropertyById);

router.post('/',
  uploadPropertyImages.fields([
    { name: 'images', maxCount: 10 },
    { name: 'video', maxCount: 1 }
  ]),
  validateProperty,
  propertyController.createProperty
);

router.put('/:id',
  uploadPropertyImages.fields([
    { name: 'images', maxCount: 10 },
    { name: 'video', maxCount: 1 }
  ]),
  validateProperty,
  propertyController.updateProperty
);

router.delete('/:id', propertyController.deleteProperty);

router.delete('/:id/images/:imageIndex', propertyController.removePropertyImage);

module.exports = router;