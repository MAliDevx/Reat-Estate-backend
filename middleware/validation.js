const { body } = require('express-validator');

// Property validation rules
const validateProperty = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Property name must be between 1 and 100 characters'),

  body('location')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Location must be between 1 and 200 characters'),

  body('price')
    .isNumeric()
    .withMessage('Price must be a valid number')
    .isFloat({ min: 0 })
    .withMessage('Price cannot be negative'),

  body('area')
    .optional()
    .isNumeric()
    .withMessage('Area must be a valid number')
    .isFloat({ min: 0 })
    .withMessage('Area cannot be negative'),

  body('bedrooms')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Bedrooms must be a non-negative integer'),

  body('bathrooms')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Bathrooms must be a non-negative integer'),

  body('status')
    .isIn(['Available', 'Pending', 'Sold'])
    .withMessage('Status must be one of: Available, Pending, Sold'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 3000 })
    .withMessage('Description cannot exceed 3000 characters')
];

// Category validation rules
const validateCategory = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Category name must be between 1 and 50 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 3000 })
    .withMessage('Description cannot exceed 3000 characters'),

  body('status')
    .isIn(['Active', 'Inactive'])
    .withMessage('Status must be one of: Active, Inactive')
];

// Contact validation rules
const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Name must be between 1 and 200 characters'),

  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),

  body('number')
    .trim()
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('Please provide a valid phone number'),

  body('message')
    .trim()
    .isLength({ min: 1, max: 4000 })
    .withMessage('Message must be between 1 and 4000 characters')
];

module.exports = {
  validateProperty,
  validateCategory,
  validateContact
};