const { pool } = require('../db.js');

module.exports.getAllBooks = async (req, res, next) => {
  try {
    const { rows: allBooks } = await pool.query('SELECT * FROM books');
    res.send(allBooks);
  } catch (error) {
    next(error);
  }
};

module.exports.createNewBook = async (req, res, next) => {
  try {
    const { title, author, isbn, synopsis, publicationYear } = req.body;

    await pool.query(
      `INSERT INTO books (title, author, isbn, synopsis, publicationYear) VALUES ($1, $2, $3, $4, $5)`,
      [title, author, isbn, synopsis, publicationYear],
    );

    res.send({ title, author, isbn, synopsis, publicationYear });
  } catch (error) {
    next(error);
  }
};
