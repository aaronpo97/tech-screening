import { Box, Container, Typography } from '@mui/material';
import EditBookForm from '../components/bookComponents/EditBookForm';

const EditBook = () => (
  <Container component="main" sx={{ mt: 5, mb: 3 }}>
    <Typography variant="h1">Books</Typography>
    <Typography variant="h2">Edit</Typography>
    <EditBookForm />
  </Container>
);

export default EditBook;
