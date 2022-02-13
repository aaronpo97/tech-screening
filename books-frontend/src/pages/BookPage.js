import { useEffect, useState } from 'react';

import { Container, Box, Typography, Grid, Button } from '@mui/material';

const BookPage = () => {
  const [bookInfo, setBookInfo] = useState({
    title: '',
    synopsis: '',
    author: '',
    publicationYear: '',
  });

  useEffect(
    () =>
      (async () => {
        // logic to retrieve data goes here
        setBookInfo();
      })(),
    [],
  );
  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Typography variant="h1">
              {bookInfo.title} ({bookInfo.publicationYear})
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Button variant="contained">Edit {bookInfo.title}</Button>
          </Grid>
        </Grid>
        <Typography variant="h2">{bookInfo.author}</Typography>
        <Typography variant="h3">Synopsis</Typography>
        <Typography variant="body2">{bookInfo.synopsis}</Typography>
      </Container>
    </Box>
  );
};

export default BookPage;
