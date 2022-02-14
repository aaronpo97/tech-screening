import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Pagination, Tooltip, Grid, CardActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const [pageNum, setPageNum] = useState(1);
  const [pageCount, setPageCount] = useState();

  const getData = async () => {
    const response = await fetch(`/api/books?page=${pageNum}&size=3`);

    const data = await response.json();

    setBooks(data.payload.paginatedBooks);
    setPageCount(data.payload.pageCount);
  };

  useEffect(() => {
    getData();
  }, [pageNum]);

  const handleChange = (event, value) => {
    setPageNum(value);
  };

  const handleDelete = async (bookId) => {
    try {
      const url = `/api/books/${bookId}`;
      const requestOptions = { method: 'DELETE' };
      const response = await fetch(url, requestOptions);

      if (response.status !== 200) return;
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item sm={12} md={4}>
            <Card sx={{ height: '30em' }} elevation={3} key={book.id}>
              <CardContent>
                <Typography
                  variant="h2"
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
                  {book.title} ({book.publication_year})
                </Typography>

                <Typography variant="h4" gutterBottom>
                  by {book.author}
                </Typography>

                <Typography variant="h5">Synopsis:</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 12,
                  }}
                  gutterBottom
                >
                  {book.synopsis}
                </Typography>

                <Typography variant="caption">ISBN: {book.isbn}</Typography>
              </CardContent>
              <CardActions>
                <Box>
                  <Tooltip title="Edit" sx={{ mx: 1 }}>
                    <EditIcon onClick={() => navigate(`/books/${book.id}/edit`)} />
                  </Tooltip>
                  <Tooltip title="Delete" sx={{ mx: 1 }}>
                    <DeleteIcon onClick={() => handleDelete(book.id)} />
                  </Tooltip>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Pagination count={pageCount} page={pageNum} onChange={handleChange} />
      </Box>
    </Box>
  );
};

export default BooksList;
