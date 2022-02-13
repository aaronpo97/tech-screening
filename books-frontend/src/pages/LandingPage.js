import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BooksList from '../components/bookComponents/BooksList';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Container sx={{ mt: 5, mb: 5 }}>
        <Grid container spacing={2}>
          <Grid item md={10}>
            <Typography variant="h1">The Bookshelf</Typography>
            <Typography variant="h2">Books</Typography>
          </Grid>
          <Grid item md={2}>
            <Button variant="contained" fullWidth onClick={() => navigate('/add-book')}>
              Add a new book
            </Button>
          </Grid>
        </Grid>
        <BooksList />
      </Container>
    </Box>
  );
};

export default LandingPage;
