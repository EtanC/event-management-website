/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import background from './LoginLHSBackground.png';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Use the useNavigate hook

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
        const response = await axios.post('http://127.0.0.1:5000/auth/login', {
            username: email,
            password,
        });
        console.log('Login successful:', response.data);
        // Use local storage for now
        localStorage.setItem('token', response.data.token);
        navigate('/home');
        
        } catch (error) {
            // need to do the errors properly 
        console.error('Error logging in:', error.response ? error.response.data.description : error.message);
        setErrorMessage(error.response ? error.response.data.description : error.message);
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
            <Button variant="contained" sx={{ fontWeight: 'bold', borderRadius: '15px', mt: 2,backgroundColor: '#91b748', color: '#FFFFF', '&:hover': { backgroundColor: '#1E4830' } }}>
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
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{  fontWeight: 'bold', borderRadius: '20px' }}>
                Login
                </Button>
                <Button
                    // component = {forgot login page}
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
            </Box>
        </Grid>
        </Grid>
    );
};

export default LoginPage; 
