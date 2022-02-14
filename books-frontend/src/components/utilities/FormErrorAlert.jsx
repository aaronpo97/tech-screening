import { Alert, Box } from '@mui/material';
import PropTypes from 'prop-types';

const FormErrorAlert = ({ error }) => (
  <Box sx={{ width: '100%' }}>
    <Alert
      severity="error"
      sx={{
        mt: '5px',
        mb: '0em',
        padding: '0px',
        paddingLeft: '10px',
        paddingRight: '10px',
        fontSize: '0.77rem',
        height: '32px',
      }}
    >
      {error}
    </Alert>
  </Box>
);

FormErrorAlert.propTypes = {
  error: PropTypes.string.isRequired,
};
export default FormErrorAlert;
