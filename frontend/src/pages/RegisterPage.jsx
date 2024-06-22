/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Alert,
} from '@mui/material';
import background from './LHSBackground.png';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // password validation
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Check if passwords match, might want to change this into backend or something
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/register', {
        email,
        password,
        username: name,
      });
      console.log('Registration successful:', response.data);
      // Use local storage for now
      localStorage.setItem('token', response.data.token);
      setErrorMessage('');
      // Simulate longer loading time
      await sleep(2000);
      navigate('/');
    } catch (error) {
      console.error('Error registering:', error.response ? error.response.data.description : error.message);
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
        <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 'bold', fontSize: '1.8em' }}>Welcome back</Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>To keep connecting us with your information</Typography>
        <Button variant="contained" sx={{ fontWeight: 'bold', borderRadius: '15px', mt: 2, backgroundColor: '#91b748', color: '#FFFFFF', '&:hover': { backgroundColor: '#1E4830' } }} onClick={() => navigate('/login')}>
          Sign in
        </Button>
      </Grid>

      {/* Right Side */}
      <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
        <Box elevation={6} sx={{ padding: 4, width: '100%', maxWidth: 600 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1E4830', fontWeight: 'bold' }}>
            Register New User
          </Typography>
          {isLoading ? (
            <Typography align="center" sx={{ mt: 2 }}>Loading...</Typography>
          ) : (
            <Box
              component="form"
              onSubmit={handleRegister}
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
                helperText="Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
              />
              <TextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                fullWidth
                InputProps={{
                  sx: {
                    borderRadius: '20px',
                  },
                }}
                disabled={!validatePassword(password)} // Disable until password is valid
              />
              <TextField
                label="User Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                Sign Up
              </Button>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
