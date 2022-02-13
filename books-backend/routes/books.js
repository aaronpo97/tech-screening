const express = require('express');
const router = express.Router();

const { getAllBooks, createNewBook } = require('../controllers');

router.route('/').get(getAllBooks).post(createNewBook);

module.exports = router;
