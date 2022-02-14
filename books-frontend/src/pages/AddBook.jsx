import { Box, Container, Typography } from '@mui/material';
import AddBookForm from '../components/bookComponents/AddBookForm';

const AddBook = () => (
  <Box>
    <Container sx={{ mt: 5, mb: 3 }}>
      <Typography variant="h1">Books</Typography>
      <Typography variant="h2">Post a New Book</Typography>
      <AddBookForm />
    </Container>
  </Box>
);

export default AddBook;
