import { Box, Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const BooksList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('https://api.mockaroo.com/api/e31daa90?count=30&key=256fc480');

      const data = await response.json();
      setBooks(data);
    })();
  }, []);

  return (
    <Box>
      {books.map((book) => (
        <Card sx={{ mt: 2 }} elevation={5}>
          <CardContent>
            <Typography variant='h3' sx={{ fontStyle: 'italic' }}>
              {book.title}({book.publicationYear})
            </Typography>

            <Typography variant='h4' gutterBottom>
              by {book.author}
            </Typography>

            <Typography variant='h5'>Synopsis:</Typography>
            <Typography variant='body2' gutterBottom>
              {book.synopsis}
            </Typography>

            <Typography variant='caption'>ISBN: {book.isbn}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default BooksList;
