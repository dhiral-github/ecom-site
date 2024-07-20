import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const SpinnerLoading = ({ text }) => (
  <Box display='flex' flexDirection='column' alignItems='center' mt={10}>
    <CircularProgress />
    <Typography variant='overline'>{text}</Typography>
  </Box>
);

export default SpinnerLoading;
