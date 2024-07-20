import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NoDataAvailable = ({ text }) => {
  return (
    <div>
      <Box display='flex' flexDirection='column' alignItems='center' mt={10}>
        
        <Typography variant='overline'>{text}</Typography>
      </Box>
    </div>
  )
}

export default NoDataAvailable;