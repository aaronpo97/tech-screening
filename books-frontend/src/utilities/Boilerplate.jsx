import { useNavigate, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Container, Typography, Button, Box } from '@mui/material';

const Boilerplate = () => {
   const pages = [
      { name: 'books', link: '/' },
      { name: 'authors', link: '/authors' },
   ];

   const navigate = useNavigate();

   return (
      <>
         <AppBar position='fixed' elevation={12}>
            <Container maxWidth='xl'>
               <Toolbar sx={{ flexWrap: 'wrap' }}>
                  <Typography
                     variant='h6'
                     noWrap
                     component='a'
                     sx={{ mr: 5, display: { xs: 'none', md: 'flex' }, cursor: 'pointer' }}
                     onClick={() => navigate('/')}
                  >
                     The Books App
                  </Typography>
                  <Box sx={{ flexGrow: 1, display: 'flex' }}>
                     {pages.map(page => (
                        <Button
                           key={page.name}
                           variant='contained'
                           disableElevation
                           onClick={() => navigate(page.link)}
                        >
                           <Typography variant='h6'>{page.name}</Typography>
                        </Button>
                     ))}
                  </Box>
               </Toolbar>
            </Container>
         </AppBar>
         <Toolbar />

         <Outlet />
      </>
   );
};

export default Boilerplate;
