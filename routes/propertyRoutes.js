const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { uploadPropertyImages } = require('../middleware/upload');
const { validateProperty } = require('../middleware/validation');
const { verifyAdmin } = require('../middleware/auth');


router.get('/', propertyController.getAllProperties);

router.get('/:id', propertyController.getPropertyById);

router.post('/',
  verifyAdmin,
  uploadPropertyImages.fields([
    { name: 'images', maxCount: 6 },
    { name: 'video', maxCount: 1 }
  ]),
  validateProperty,
  propertyController.createProperty
);

router.put('/:id',
  verifyAdmin,
  uploadPropertyImages.fields([
    { name: 'images', maxCount: 6 },
    { name: 'video', maxCount: 1 }
  ]),
  validateProperty,
  propertyController.updateProperty
);

router.delete('/:id', verifyAdmin, propertyController.deleteProperty);

router.delete('/:id/images/:imageIndex', verifyAdmin, propertyController.removePropertyImage);

module.exports = router;