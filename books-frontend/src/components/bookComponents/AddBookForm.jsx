/* eslint-disable camelcase */
import { useState } from 'react';
import { FormControl, Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormErrorAlert from '../utilities/FormErrorAlert';

const AddBookForm = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    title: '',
    author: '',
    publication_year: '',
    isbn: '',
    synopsis: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const handleFormInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const checkIfBookExists = async () => {
    const url = `/api/books/checkifbookexists?title=${formValues.title}&author=${formValues.author}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.payload;
  };

  const validateData = async () => {
    const errors = {};

    const { bookExists } = await checkIfBookExists();
    if (!formValues.title) {
      errors.title = 'Book title is required.';
    }
    if (!formValues.author) {
      errors.author = 'Book author is required.';
    }
    if (bookExists) {
      errors.title = 'A book with the given title and author already exists.';
      errors.author = 'A book with the given title and author already exists.';
    }
    if (!formValues.publication_year) {
      errors.publication_year = 'Year of publication is required.';
    }
    if (!parseInt(formValues.publication_year, 10)) {
      errors.publication_year = 'Year of publication is invalid.';
    }
    if (!formValues.isbn) {
      errors.isbn = 'ISBN is required.';
    }

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      throw new Error('Form validation failed.');
    }
  };

  const submitToDB = async () => {
    const { title, author, publication_year, isbn, synopsis } = formValues;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        author,
        publication_year: parseInt(publication_year, 10),
        isbn,
        synopsis,
      }),
    };
    const url = '/api/books';
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data.payload;
  };

  const handleRedirect = (payload) => {
    const { id } = payload;
    navigate(`/books/${id}`);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    validateData()
      .then(() => submitToDB())
      .then((payload) => handleRedirect(payload))
      .catch((error) => console.error(error));
  };

  return (
    <Box component="form" onSubmit={onFormSubmit} noValidate sx={{ mt: 1 }}>
      <FormControl fullWidth>
        <TextField
          required
          value={formValues.title}
          id="title"
          label="Book title"
          name="title"
          autoComplete="Book title"
          autoFocus
          onChange={handleFormInputChange}
          margin="normal"
          fullWidth
          error={!!formErrors.title}
        />
        {formErrors.title && <FormErrorAlert error={formErrors.title} />}
        <TextField
          required
          value={formValues.author}
          id="author"
          label="Book author"
          name="author"
          autoComplete="Book author"
          autoFocus
          onChange={handleFormInputChange}
          margin="normal"
          fullWidth
          error={!!formErrors.author}
        />
        {formErrors.author && <FormErrorAlert error={formErrors.author} />}
        <TextField
          required
          value={formValues.isbn}
          id="isbn"
          label="Book isbn"
          name="isbn"
          autoComplete="Book isbn"
          autoFocus
          onChange={handleFormInputChange}
          margin="normal"
          fullWidth
          error={!!formErrors.isbn}
        />
        {formErrors.isbn && <FormErrorAlert error={formErrors.isbn} />}

        <TextField
          required
          value={formValues.publication_year}
          id="publication_year"
          label="Book publication year"
          name="publication_year"
          autoComplete="Book publication year"
          autoFocus
          onChange={handleFormInputChange}
          margin="normal"
          fullWidth
          error={!!formErrors.publication_year}
        />
        {formErrors.publication_year && <FormErrorAlert error={formErrors.publication_year} />}

        <TextField
          required
          value={formValues.synopsis}
          multiline
          rows={10}
          id="Synopsis"
          label="Synopsis"
          name="synopsis"
          autoComplete="Book synopsis"
          autoFocus
          onChange={handleFormInputChange}
          margin="normal"
          fullWidth
          error={!!formErrors.synopsis}
        />
        {formErrors.synopsis && <FormErrorAlert error={formErrors.synopsis} />}

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Submit a new book!
        </Button>
      </FormControl>
    </Box>
  );
};

export default AddBookForm;
