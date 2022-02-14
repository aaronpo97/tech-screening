import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BooksList from '../components/bookComponents/BooksList';

const LandingPage = () => (
  <Container component="main" sx={{ mt: 5, mb: 3 }}>
    <Box sx={{ mb: 4 }}>
      <Typography variant="h1">The Bookshelf</Typography>
      <Typography variant="h2">Books</Typography>
    </Box>
    <BooksList />
  </Container>
);

export default LandingPage;
