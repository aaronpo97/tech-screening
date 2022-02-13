import { Container, Typography } from '@mui/material';
import AddBookForm from '../components/bookComponents/AddBookForm';

const AddBook = () => (
  <Container sx={{ mt: 5 }}>
    <Typography variant="h1">Books</Typography>
    <Typography variant="h2">Post a New Book</Typography>
    <AddBookForm />
  </Container>
);

export default AddBook;
