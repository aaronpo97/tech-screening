/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Card, CardContent, CardActions, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const handleDelete = async (bookId) => {
    try {
      const url = `/api/books/${bookId}`;
      const requestOptions = { method: 'DELETE' };
      const response = await fetch(url, requestOptions);

      if (response.status !== 200) return;
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(
    () =>
      (async () => {
        const url = `/api/books/${id}`;
        const response = await fetch(url);
        if (response.status === 404) {
          navigate('/notfound');
        }
        const data = await response.json();

        const { title, synopsis, author, publication_year, isbn, created_at } = data.payload;
        setBookInfo({ title, synopsis, author, publication_year, isbn, id, created_at });
      })(),
    [],
  );

  return (
    <Container component="main" sx={{ mt: 5, mb: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ mt: 1 }}>
            <Typography variant="h1" sx={{ fontStyle: 'italic' }}>
              {bookInfo.title}
            </Typography>
            <Typography variant="h2" gutterBottom>
              by {bookInfo.author}
            </Typography>
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
          <Box sx={{ mt: 3 }}>
            <Typography variant="caption">Posted on {bookInfo.created_at}</Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Box>
            <Tooltip title="Edit" sx={{ mx: 1 }}>
              <EditIcon onClick={() => navigate(`/books/${bookInfo.id}/edit`)} />
            </Tooltip>
            <Tooltip title="Delete" sx={{ mx: 1 }}>
              <DeleteIcon onClick={() => handleDelete(bookInfo.id)} />
            </Tooltip>
          </Box>
        </CardActions>
      </Card>
    </Container>
  );
};

export default BookPage;
