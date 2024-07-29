/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert, Grid, Divider } from '@mui/material';
import background from '../Image/LHSBackground.png';
import Logo from '../components/CompanyLogo';
import { handleLogin } from '../helper/handleAuth';
import LoginWithSocial from '../components/LoginWithSocialButtons';
import { useProfile } from '../components/ProfileProvider';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setTokenExpires } = useProfile();
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        handleLogin(email, password, navigate, setErrorMessage, setIsLoading, setTokenExpires);
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
                    <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 'bold', fontSize: '1.8em', color: 'white' }}>Don't have an account?</Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2, color: 'white' }}>Register with us today!</Typography>
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
                        <Logo navigate={navigate} />
                        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1E4830', fontWeight: 'bold' }}>
                            Login To Your Account
                        </Typography>
                        <Typography variant="body2" align="center" sx={{ color: '#1E4830' }}>
                            Login Using Social Networks
                        </Typography>
                        <LoginWithSocial error={setErrorMessage}/>
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
        </>
    );
};

export default LoginPage;
