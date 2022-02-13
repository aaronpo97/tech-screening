import { StrictMode } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';
import Boilerplate from './utilities/Boilerplate';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import AddBook from './pages/AddBook';

import theme from './utilities/theme';

const App = () => (
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route path="/" element={<Boilerplate />}>
            <Route path="" element={<LandingPage />} />
            <Route path="/add_book" element={<AddBook />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);

export default App;
