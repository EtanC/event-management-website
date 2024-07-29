// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Box } from '@mui/material';
import logo from '../Image/CompanyLogo.png';

// eslint-disable-next-line react/prop-types
const Logo = ({ navigate }) => (
    <Box
        sx={{ position: 'absolute', top: '50px', right: '100px', cursor: 'pointer' }}
        onClick={() => navigate('/')}
    >
        <img
            src={logo}
            alt="Company Logo"
            style={{ height: '50px' }}
        />
    </Box>
);

export default Logo;
