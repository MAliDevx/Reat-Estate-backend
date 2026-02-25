const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { validateContact } = require('../middleware/validation');


router.post('/', validateContact, contactController.createContact);

router.get('/', contactController.getAllContacts);

router.get('/:id', contactController.getContactById);

router.delete('/:id', contactController.deleteContact);

module.exports = router;