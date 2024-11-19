const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/books', bookController.getAllBooks);
router.post('/addBook', bookController.addBook);
router.put('/updateBook/:id', bookController.updateBook);
router.delete('/deleteBook/:id', bookController.deleteBook);

module.exports = router;