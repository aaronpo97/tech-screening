import { useNavigate, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Container, Typography, Button, Box } from '@mui/material';

const Boilerplate = () => {
  const pages = [
    { name: 'View Books', link: '/' },
    { name: 'Add a book', link: '/add-book' },
  ];

  const navigate = useNavigate();

  return (
    <>
      <Box component="header">
        <AppBar component="div" position="fixed" elevation={12}>
          <Container maxWidth="xl">
            <Toolbar sx={{ flexWrap: 'wrap' }}>
              <Box sx={{ flexGrow: 1, display: 'flex' }}>
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    variant="contained"
                    disableElevation
                    onClick={() => navigate(page.link)}
                  >
                    <Typography variant="h6">{page.name}</Typography>
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Toolbar />
      </Box>

      <Outlet />
    </>
  );
};

export default Boilerplate;
