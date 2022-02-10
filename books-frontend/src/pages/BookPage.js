import { useEffect, useState } from 'react';

import { Container, Box, Typography, Grid } from '@mui/material';

const BookPage = () => {
  const [bookInfo, setBookInfo] = useState({
    title: '',
    synopsis: '',
    author: '',
    publicationYear: '',
  });
  return (
    <Box>
      <Container>
        <Typography variant="h1">
          {bookInfo.title} ({bookInfo.publicationYear})
        </Typography>
        <Typography variant="h2">{bookInfo.author}</Typography>
        <Typography variant="h3">Synopsis</Typography>
        <Typography variant="body2">{bookInfo.synopsis}</Typography>
      </Container>
    </Box>
  );
};

export default BookPage;
