const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const booksRouter = require('./routes/books');
const ErrorResponse = require('./utilities/response/ErrorResponse');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/books', booksRouter);

app.use((data, req, res, next) => {
  if (data.success) {
    res.status(data.status).json(data);
  } else {
    next(data);
  }
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Oh no, something went wrong.', stack } = err;
  res.status(status).json(new ErrorResponse(message, status, stack));
});

module.exports = app;
