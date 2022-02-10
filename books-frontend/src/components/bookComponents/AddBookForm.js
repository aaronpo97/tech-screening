import { useState } from 'react';
import FormErrorAlert from '../utilities/FormErrorAlert';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { FormControl, Box, TextField, Button } from '@mui/material';

const AddBookForm = () => {
   const [formValues, setFormValues] = useState({
      name: '',
      author: '',
      publishingYear: null,
      isbn: '',
   });

   const [formErrors, setFormErrors] = useState({});
   const handleFormInputChange = event => {
      setFormValues({ ...formValues, [event.target.name]: event.target.value });
   };

   const handleDatePickerChange = publishingYear => {
      setFormValues({ ...formValues, publishingYear });
   };

   const validateData = async () => {
      const errors = {};

      if (!formValues.name) {
         errors.name = 'Book name is required.';
      }
      if (!formValues.author) {
         errors.author = 'Book author is required.';
      }
      if (!formValues.publishingYear) {
         errors.publishingYear = 'Year of publication is required.';
      }
      if (!formValues.isbn) {
         errors.isbn = 'ISBN is required.';
      }

      if (Object.keys(errors).length) {
         setFormErrors(errors);
         throw new Error('Form validation failed.');
      }

      return;
   };

   const submitToDB = async () => {
      const requestOptions = {};
      const url = '';
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      return data;
   };

   const handleRedirect = data => {};

   const onFormSubmit = event => {
      event.preventDefault();

      validateData()
         .then(() => submitToDB())
         .then(() => handleRedirect())
         .catch(error => console.error(error));
   };

   return (
      <Box component='form' onSubmit={onFormSubmit} noValidate sx={{ mt: 1 }}>
         <FormControl fullWidth>
            <TextField
               required
               value={formValues.name}
               id='name'
               label='Book name'
               name='name'
               autoComplete='Book name'
               autoFocus
               onChange={handleFormInputChange}
               margin='normal'
               fullWidth
               error={!!formErrors.name}
            />
            {formErrors.name && <FormErrorAlert error={formErrors.name} />}
            <TextField
               required
               value={formValues.author}
               id='author'
               label='Book author'
               name='author'
               autoComplete='Book author'
               autoFocus
               onChange={handleFormInputChange}
               margin='normal'
               fullWidth
               error={!!formErrors.author}
            />
            {formErrors.author && <FormErrorAlert error={formErrors.author} />}
            <TextField
               required
               value={formValues.isbn}
               id='isbn'
               label='Book isbn'
               name='isbn'
               autoComplete='Book isbn'
               autoFocus
               onChange={handleFormInputChange}
               margin='normal'
               fullWidth
               error={!!formErrors.isbn}
               sx={{ mb: 3 }}
            />
            {formErrors.isbn && <FormErrorAlert error={formErrors.isbn} />}

            <LocalizationProvider dateAdapter={AdapterDateFns}>
               <DatePicker
                  views={['year']}
                  label='Year of publication'
                  value={formValues.publishingYear}
                  onChange={handleDatePickerChange}
                  renderInput={params => <TextField {...params} helperText={null} />}
               />
            </LocalizationProvider>

            {formErrors.publishingYear && <FormErrorAlert error={formErrors.publishingYear} />}

            <Button type='submit' variant='contained' fullWidth sx={{ mt: 3 }}>
               Submit a new book!
            </Button>
         </FormControl>
      </Box>
   );
};

export default AddBookForm;
