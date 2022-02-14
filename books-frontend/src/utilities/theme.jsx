import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#111111' },
    secondary: { main: '#e5ebff' },
    error: { main: '#800020' },
    background: {
      default: '#ffffff',
      paper: '#f9f9f9',
    },
  },
  typography: {
    h1: { fontSize: '40pt', fontWeight: 500 },
    h2: { fontSize: '20pt', fontWeight: 500 },
    h3: { fontSize: '16pt', fontWeight: 500 },
    h4: { fontSize: '14pt', fontWeight: 450 },
    h5: { fontSize: '12pt', fontWeight: 420 },
    h6: { fontSize: '13pt', fontWeight: 420 },
    body1: { fontSize: '12pt' },
    body2: { fontSize: '12pt' },
    caption: { fontWeight: 450, fontSize: '10pt' },
    fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
});

export default theme;
