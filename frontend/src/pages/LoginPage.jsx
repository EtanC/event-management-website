import React from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
  Divider,
  IconButton,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import background from './LHSBackground.png';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:5000/auth/login', {
                username: email,
                password,
            });
            const token = response.data.token;
            const decodedToken = jwtDecode(token);
            const sessionEndTime = decodedToken.session_end_time;

            localStorage.setItem('token', token);
            localStorage.setItem('session_end_time', sessionEndTime);

            // Set timeout to log out the user when the session expires
            const sessionExpiryTime = new Date(sessionEndTime).getTime() - new Date().getTime();
            setTimeout(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('session_end_time');
                navigate('/login');
            }, sessionExpiryTime);

            await sleep(2000);
            navigate('/'); // navigate to home
        } catch (error) {
            console.error('Error logging in:', error.response ? error.response.data.description : error.message);
            setErrorMessage(error.response ? error.response.data.description : error.message);
        } finally {
            setIsLoading(false);
        }
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
            <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
                <Box elevation={6} sx={{ padding: 4, width: '100%', maxWidth: 600 }}>
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
                            onSubmit={handleLogin}
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
                                // component={Link}
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
