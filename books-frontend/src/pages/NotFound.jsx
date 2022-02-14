import { Container, Box, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container component="main" sx={{ mt: 5, mb: 3 }}>
      <Card>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              height: '10em',
            }}
          >
            <Box>
              <Typography variant="h3">404: Not found</Typography>
              <Typography variant="body1">Sorry, we are unable to find that resource.</Typography>
            </Box>
            <Box>
              <Button variant="contained" onClick={() => navigate('/')}>
                Go to homepage
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NotFound;
