const express = require('express');
const router = express.Router();

const {
  checkIfBookExists,
  createNewBook,
  deleteBook,
  editBook,
  getAllBooks,
  viewBook,
} = require('../controllers');
const ServerError = require('../utilities/errors/ServerError');

router
  .route('/')
  .get(getAllBooks)
  .post(createNewBook)
  .all(() => {
    throw new ServerError('Not allowed.', 405);
  });

router
  .route('/checkifbookexists')
  .get(checkIfBookExists)
  .all(() => {
    throw new ServerError('Not allowed.', 405);
  });

router
  .route('/:id')
  .get(viewBook)
  .put(editBook)
  .delete(deleteBook)
  .all(() => {
    throw new ServerError('Not allowed.', 405);
  });

module.exports = router;
