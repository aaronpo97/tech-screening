import { useEffect, useState } from 'react';
import { FormControl, Box, TextField, Button, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import FormErrorAlert from '../utilities/FormErrorAlert';

const EditBookForm = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    author: '',
    isbn: '',
    publicationyear: '',
    synopsis: '',
    title: '',
  });
  const [formValues, setFormValues] = useState({
    author: '',
    isbn: '',
    publicationyear: '',
    synopsis: '',
    title: '',
  });

  const { id: bookId } = useParams();

  const handleDelete = async () => {
    try {
      const url = `/books/${bookId}`;
      const requestOptions = { method: 'DELETE' };
      await fetch(url, requestOptions);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    (async () => {
      const url = `/api/books/${bookId}`;
      const response = await fetch(url);
      const data = await response.json();
      const { author, isbn, publicationyear, synopsis, title } = data.payload;

      setBookData({ author, isbn, publicationyear, synopsis, title });
    })();
  }, []);

  useEffect(() => setFormValues(bookData), [bookData]);

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
    if (bookExists && !(bookData.author === formValues.author && bookData.title === formValues.title)) {
      errors.title = 'A book with the given title and author already exists.';
      errors.author = 'A book with the given title and author already exists.';
    }
    if (!formValues.publicationyear) {
      errors.publicationyear = 'Year of publication is required.';
    }
    if (!parseInt(formValues.publicationyear, 10)) {
      errors.publicationyear = 'Year of publication is invalid.';
    }
    if (!formValues.isbn) {
      errors.isbn = 'ISBN is required.';
    }
    if (!formValues.synopsis) {
      errors.isbn = 'Synopsis is required.';
    }

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      throw new Error('Form validation failed.');
    }
  };

  const submitToDB = async () => {
    const { title, author, publicationyear, isbn, synopsis } = formValues;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, publicationyear, isbn, synopsis }),
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
          value={formValues.publicationyear}
          id="publicationyear"
          label="Book publication year"
          name="publicationyear"
          autoComplete="Book publication year"
          autoFocus
          onChange={handleFormInputChange}
          margin="normal"
          fullWidth
          error={!!formErrors.publicationyear}
        />
        {formErrors.publicationyear && <FormErrorAlert error={formErrors.publicationyear} />}

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
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Edit {`'${bookData.title}'`}
            </Button>
          </Grid>
          <Grid item md={6}>
            <Button color="error" variant="contained" onClick={handleDelete} fullWidth sx={{ mt: 3 }}>
              Delete {`'${bookData.title}'`}
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </Box>
  );
};

export default EditBookForm;
