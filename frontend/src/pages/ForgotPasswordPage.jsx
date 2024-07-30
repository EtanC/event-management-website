import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert, Grid, Divider } from '@mui/material';
import background from '../Image/LHSBackground.png';
import Logo from '../components/CompanyLogo';
import { handleLogin } from '../helper/handleAuth';
import LoginWithSocial from '../components/LoginWithSocialButtons';
import { useProfile } from '../components/ProfileProvider';
import config from '../config'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { isAuthenticated } = useProfile();
  const navigate = useNavigate();
  useEffect(() => {
    // Navigate to home page if user is authenticated
    if (isAuthenticated) {
      navigate('/')
    }
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${config.apiBaseUrl}/auth/forgot_password`, { 'email': email });
      if (response.data.message === "email sent") {
        setSuccessMessage('Password reset request confirmed!')
        setErrorMessage('')
    }
    } catch (error) {
        setErrorMessage(error.response ? error.response.data.description : error.message);
    }
  }

  return (
    <>
        <Grid container sx={{ height: '100vh', backgroundColor: '#FFFFFF' }}>
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
            </Grid>

            {/* Right Side */}
            <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4, position: 'relative' }}>
                <Box elevation={6} sx={{ padding: 4, width: '100%', maxWidth: 600 }}>
                    <Logo />
                    <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1E4830', fontWeight: 'bold' }}>
                        Forgot Password?
                    </Typography>
                    <Typography variant="body2" align="center" sx={{ color: '#1E4830' }}>
                        Type in your email and we'll send you a password reset link!
                    </Typography>
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
                            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                            {successMessage && <Alert severity="success">{successMessage}</Alert>}
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ fontWeight: 'bold', borderRadius: '20px' }}>
                                Send Email
                            </Button>
                        </Box>
                </Box>
            </Grid>
        </Grid>
    </>
  );
}

export default ForgotPasswordPage;