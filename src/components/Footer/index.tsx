import { Box, Typography } from '@mui/material';
import React from 'react';

const Footer: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        background: 'transparent',
        width: '100%',
        bottom: 0,
        minHeight: '300px',
      }}
      component="footer"
    >
      <Typography variant="h6" align="center" gutterBottom color="#fff">
        This is footer
      </Typography>
    </Box>
  );
};

export default Footer;
