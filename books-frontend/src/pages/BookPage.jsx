/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';

const BookPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [bookInfo, setBookInfo] = useState({
    title: '',
    synopsis: '',
    author: '',
    publication_year: '',
    id: '',
    created_at: '',
  });

  useEffect(
    () =>
      (async () => {
        const url = `/api/books/${id}`;
        const response = await fetch(url);
        if (response.status !== 200) {
          navigate('/notfound');
        }
        const data = await response.json();

        const { title, synopsis, author, publication_year, isbn, created_at } = data.payload;
        setBookInfo({ title, synopsis, author, publication_year, isbn, id, created_at });
      })(),
    [],
  );

  return (
    <Box>
      <Container sx={{ mt: 5 }}>
        <Typography variant="h1">{bookInfo.title}</Typography>
        <Typography variant="h2" gutterBottom>
          by {bookInfo.author}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="h4">Year published: </Typography>
          <Typography variant="body2">{bookInfo.publication_year}</Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography variant="h4">ISBN:</Typography>
          <Typography variant="body2">{bookInfo.isbn}</Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography variant="h4">Synopsis:</Typography>
          <Typography variant="body2">{bookInfo.synopsis}</Typography>
        </Box>
        <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate(`/books/${bookInfo.id}/edit`)}>
          Edit
        </Button>

        <Box>Posted on {bookInfo.created_at}</Box>
      </Container>
    </Box>
  );
};

export default BookPage;
