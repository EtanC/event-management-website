// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Box, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleAuth from './GoogleAuth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useProfile } from './ProfileProvider';

const SocialLoginButtons = (error) => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    const { setTokenExpires } = useProfile();
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
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleAuth error={error} setTokenExpires={(x) => setTokenExpires(x)}></GoogleAuth>
            </GoogleOAuthProvider>
        </Box>
    );
};

export default SocialLoginButtons;
