import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

const Header: React.FC = () => {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'rgba(144, 202, 249, 0.95)',
      }}
    >
      {/* Logo content */}
    </Box>
  );
};

export default Header; 