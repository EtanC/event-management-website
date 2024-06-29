// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Box, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

const SocialLoginButtons = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
            <IconButton>
                <InstagramIcon />
            </IconButton>
            <IconButton>
                <LinkedInIcon />
            </IconButton>
            <IconButton>
                <FacebookIcon />
            </IconButton>
        </Box>
    );
};

export default SocialLoginButtons;
