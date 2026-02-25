const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { uploadCategoryImage } = require('../middleware/upload');
const { validateCategory } = require('../middleware/validation');


router.get('/', categoryController.getAllCategories);

router.get('/active', categoryController.getActiveCategories);

router.get('/:id', categoryController.getCategoryById);

router.post('/',
  uploadCategoryImage.array('image', 6), // max 10 images
  validateCategory,
  categoryController.createCategory
);

router.put('/:id',
  uploadCategoryImage.array('image', 6),
  validateCategory,
  categoryController.updateCategory
);

router.delete('/:id', categoryController.deleteCategory);

module.exports = router;