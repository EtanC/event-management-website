import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    Box,
    Grid,
    Alert,
} from '@mui/material';
import background from '../Image/LHSBackground.png';
import { handleRegister } from '../components/handleAuth.jsx';
import logo from '../Image/CompanyLogo.png';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Password validation
    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    };

    const handleRegisterFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            setIsLoading(false);
            return;
        }

        // Use the handleRegister function to register the user
        await handleRegister(email, password, name, setErrorMessage, setIsLoading, navigate);
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
                    <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1E4830', fontWeight: 'bold' }}>
                        Register New User
                    </Typography>
                    {isLoading ? (
                        <Typography align="center" sx={{ mt: 2 }}>Loading...</Typography>
                    ) : (
                        <Box
                            component="form"
                            onSubmit={handleRegisterFormSubmit}
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
