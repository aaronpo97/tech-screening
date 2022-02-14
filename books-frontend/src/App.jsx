import { StrictMode } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';
import Boilerplate from './components/utilities/Boilerplate';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import AddBook from './pages/AddBook';
import BookPage from './pages/BookPage';
import EditBook from './pages/EditBook';

import theme from './utilities/theme';

const App = () => (
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route path="/" element={<Boilerplate />}>
            <Route path="" element={<LandingPage />} />
            <Route path="/books/:id" element={<BookPage />} />
            <Route path="/books/:id/edit" element={<EditBook />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);

export default App;
