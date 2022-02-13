import { Box, Container, Typography, Grid, Button } from '@mui/material';
import BooksList from '../components/bookComponents/BooksList';

const LandingPage = () => (
  <Box>
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={2}>
        <Grid item md={10}>
          <Typography variant="h1">The Bookshelf</Typography>
          <Typography variant="h2">Books</Typography>
        </Grid>
        <Grid item md={2}>
          <Button variant="contained" fullWidth>
            Add a new book
          </Button>
        </Grid>
      </Grid>
      <BooksList />
    </Container>
  </Box>
);

export default LandingPage;
