import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert, Grid, Divider, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import background from './LHSBackground.png';
import logo from '../components/CompanyLogo.png';
import { handleLogin } from '../components/handleAuth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        handleLogin(email, password, navigate, setErrorMessage, setIsLoading);
    };

    return (
        <Grid container sx={{ height: '100vh' }}>
            {/* Left Side */}
            <Grid 
                item 
                xs={12} 
                md={4}
                sx={{
                    backgroundColor: '#1E4830',
                    color: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 4,
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 'bold', fontSize: '1.8em' }}>Don't have an account?</Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>Register with us today!</Typography>
                <Button 
                    variant="contained" 
                    sx={{ 
                        fontWeight: 'bold', 
                        borderRadius: '15px', 
                        mt: 2, 
                        backgroundColor: '#91b748', 
                        color: '#FFFFF', 
                        '&:hover': { backgroundColor: '#1E4830' } 
                    }} 
                    onClick={() => navigate('/register')}
                >
                    Sign up
                </Button>
            </Grid>

            {/* Right Side */}
            <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4, position: 'relative' }}>
                <Box elevation={6} sx={{ padding: 4, width: '100%', maxWidth: 600 }}>
                    <Box 
                        sx={{ position: 'absolute', top: '100px', right: '100px', cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        <img
                            src={logo}
                            alt="Company Logo"
                            style={{ height: '50px' }}
                        />
                    </Box>
                    <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1E4830', fontWeight: 'bold'}}>
                        Login To Your Account
                    </Typography>
                    <Typography variant="body2" align="center" sx={{ color: '#1E4830'}}>
                        Login Using Social Networks
                    </Typography>
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
                    <Divider>OR</Divider>
                    {isLoading ? (
                        <Typography align="center" sx={{ mt: 2 }}>Loading...</Typography>
                    ) : (
                        <Box
                            component="form"
                            onSubmit={onSubmit}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                mt: 2,
                            }}
                        >
                            <TextField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                                InputProps={{
                                    sx: {
                                        borderRadius: '20px',
                                    },
                                }}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                fullWidth
                                InputProps={{
                                    sx: {
                                        borderRadius: '20px',
                                    },
                                }}
                            />
                            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ fontWeight: 'bold', borderRadius: '20px' }}>
                                Login
                            </Button>
                            <Button
                                to="/forgot-password"
                                variant="text"
                                fullWidth
                                sx={{
                                    borderRadius: '20px',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    },
                                }}
                            >
                                Forgot password?
                            </Button>
                        </Box>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
