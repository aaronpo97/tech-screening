import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button, Pagination } from '@mui/material';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const [pageNum, setPageNum] = useState(1);
  const [pageCount, setPageCount] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/books?page=${pageNum}`);

      const data = await response.json();

      setBooks(data.payload.paginatedBooks);
      setPageCount(data.payload.pageCount);
    })();
  }, [pageNum]);
  const handleChange = (event, value) => {
    setPageNum(value);
  };
  return (
    <Box sx={{ mt: 2 }}>
      {books.map((book) => (
        <Card sx={{ mt: 2 }} elevation={5}>
          <CardContent>
            <Typography
              variant="h3"
              sx={{
                fontStyle: 'italic',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
              component="a"
              onClick={() => {
                navigate(`/books/${book.id}`);
              }}
            >
              {book.title} ({book.publicationyear})
            </Typography>

            <Typography variant="h4" gutterBottom>
              by {book.author}
            </Typography>

            <Typography variant="h5">Synopsis:</Typography>
            <Typography variant="body2" gutterBottom>
              {book.synopsis}
            </Typography>

            <Typography variant="caption">ISBN: {book.isbn}</Typography>
          </CardContent>
        </Card>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Pagination count={pageCount} page={pageNum} onChange={handleChange} />
      </Box>
    </Box>
  );
};

export default BooksList;
