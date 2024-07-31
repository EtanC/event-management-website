import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert, Grid, Divider } from '@mui/material';
import background from '../Image/LHSBackground.png';
import Logo from '../components/CompanyLogo';
import { handleLogin } from '../helper/handleAuth';
import LoginWithSocial from '../components/LoginWithSocialButtons';
import { useProfile } from '../components/ProfileProvider';
import config from '../config'

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get('token')
    const user_id = queryParams.get('user_id')
    try {
      const response = await axios.post(`${config.apiBaseUrl}/auth/reset_password`, { token, user_id, password });
      if (response.data.message === "Password reset") {
        setPassword('')
        setConfirmPassword('')
        setSuccessMessage("Password Reset Successfully")
        setErrorMessage('')
        navigate('/')
      }
      else {
        console.log(response.data)
      }
    } catch (error) {
        setErrorMessage(error.response ? error.response.data.description : error.message);
    }
  }

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

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
                    <Logo navigate={navigate} />
                    <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1E4830', fontWeight: 'bold' }}>
                        Reset Password
                    </Typography>
                    <Typography variant="body2" align="center" sx={{ color: '#1E4830' }}>
                        Type in your new password
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
                            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                            {successMessage && <Alert severity="success">{successMessage}</Alert>}
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ fontWeight: 'bold', borderRadius: '20px' }}>
                                Reset Password 
                            </Button>
                        </Box>
                </Box>
            </Grid>
        </Grid>
    </>
  );
}

export default ResetPasswordPage;