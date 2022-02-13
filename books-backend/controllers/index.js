const { pool } = require('../db.js');
const ServerError = require('../utilities/errors/ServerError.js');

const SuccessResponse = require('../utilities/response/SuccessResponse.js');
const paginate = require('../utilities/data-organization/paginate.js');

module.exports.getAllBooks = async (req, res, next) => {
  try {
    const booksQuery = await pool.query('SELECT * FROM books');
    const allBooks = booksQuery.rows;
    const { page = '1', size = '5' } = req.query;

    const paginatedBooks = paginate(allBooks, page, size);
    const pageCount = Math.ceil(allBooks.length / size);

    next(
      new SuccessResponse(`Viewing page ${page} of ${pageCount} of books`, 200, {
        paginatedBooks,
        pageCount,
      }),
    );
  } catch (error) {
    next(error);
  }
};

module.exports.createNewBook = async (req, res, next) => {
  try {
    const { title, author, isbn, synopsis, publicationYear } = req.body;

    const insertQuery = await pool.query(
      `INSERT INTO books (title, author, isbn, synopsis, publication_year) VALUES ($1, $2, $3, $4, $5)`,
      [title, author, isbn, synopsis, publicationYear],
    );

    const newBook = await pool.query(`SELECT * FROM books WHERE title=$1 AND author=$2`, [title, author]);

    console.log(newBook);
    next(new SuccessResponse(`Created a new book: ${title}.`, 200, newBook.rows[0]));
  } catch (error) {
    next(new ServerError(error));
  }
};

module.exports.viewBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const bookQuery = await pool.query('SELECT * FROM books WHERE id = $1', [id]);

    if (!bookQuery.rows.length) {
      throw new ServerError('Cannot find that book.', 200);
    }

    next(new SuccessResponse(`Viewing the book with the id: ${id}.`, 200, bookQuery.rows[0]));
  } catch (error) {
    next(error);
  }
};

module.exports.editBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, synopsis, publicationYear } = req.body;
    const updateQuery = await pool.query(
      'UPDATE books SET title=$1, author=$2, isbn=$3, synopsis=$4, publication_year=$5 WHERE ID=$6',
      [title, author, isbn, synopsis, publicationYear, id],
    );

    if (!updateQuery.rowCount) {
      throw new ServerError(`Cannot edit the book with id: ${id} as it could not be found.`, 404);
    }

    const editedBookQuery = await pool.query('SELECT * FROM books WHERE id=$1', [id]);
    console.log(editedBookQuery.rows[0]);

    next(new SuccessResponse(`Edited the book with the id: ${id}.`, 200, { editedCount: query.rowCount }));
  } catch (error) {
    next(error);
  }
};

module.exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = await pool.query('DELETE FROM books WHERE id=$1', [id]);
    if (!query.rowCount) {
      throw new ServerError(`Cannot delete the book with id: ${id} as it could not be found.`, 404);
    }

    next(new SuccessResponse(`Deleted the book with the id: ${id}.`, 200, { deletedCount: query.rowCount }));
  } catch (error) {
    next(error);
  }
};

module.exports.checkIfBookExists = async (req, res, next) => {
  try {
    const { title, author } = req.query;

    const query = await pool.query('SELECT * FROM books WHERE title=$1 AND author=$2', [title, author]);
    next(
      new SuccessResponse(
        `Performed query on books with title: '${title}' and author: '${author}'. Found ${query.rowCount} results.}`,
        200,
        { bookExists: !!query.rowCount ?? false },
      ),
    );
  } catch (error) {
    next(error);
  }
};
