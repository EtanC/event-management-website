// RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, Button } from '@mui/material';
import background from '../Image/LHSBackground.png';
import UserDetailsForm from '../components/registerComponents/UserDetailsForm';
import ProfileDetailsForm from '../components/registerComponents/ProfileDetailsForm';
import Logo from '../components/CompanyLogo.jsx';
import { handleRegister } from '../helper/handleAuth';

const RegisterPage = () => {
    const [step, setStep] = useState(1);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [full_name, setFullName] = useState('');
    const [headline, setHeadline] = useState('');
    const [occupation, setOccupation] = useState('');
    const [fun_fact, setFunFact] = useState('');
    const [preference, setPreference] = useState([]);

    const navigate = useNavigate();

    const handleRegisterFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        // Call handleRegister here or perform other form validation
        // Note: no preferences yeta
        await handleRegister(username, email, password, full_name, occupation, fun_fact, headline, setErrorMessage, setIsLoading, navigate)
    }

    const handleNext = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            setIsLoading(false);
            return;
        } else {
            setStep(2);
            setErrorMessage('')
        }
    }

    const handleBack = (event) => {
        event.preventDefault();
        setStep(1)
    }

    return (
        <Grid container sx={{ height: '100vh', backgroundColor: '#FFFFFF' }}>
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
                <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 'bold', fontSize: '1.8em', color: 'white' }}>Welcome back</Typography>
                <Typography variant="body1" sx={{ marginBottom: 2, color: 'white' }}>To keep connecting us with your information</Typography>
                <Button variant="contained" sx={{ fontWeight: 'bold', borderRadius: '15px', mt: 2, backgroundColor: '#91b748', color: '#FFFFFF', '&:hover': { backgroundColor: '#1E4830' } }} onClick={() => navigate('/login')}>
                    Sign in
                </Button>
            </Grid>

            <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4, position: 'relative' }}>
                <Box elevation={6} sx={{ padding: 4, width: '100%', maxWidth: 600 }}>
                    <Logo navigate={navigate} />
                    <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1E4830', fontWeight: 'bold' }}>
                        {step === 1 ? 'Register New User' : 'Create Your Profile'}
                    </Typography>
                    {step === 1 ? (
                        <UserDetailsForm
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}
                            username={username}
                            setUsername={setUsername}
                            errorMessage={errorMessage}
                            handleNext={handleNext}
                            isLoading={isLoading}
                        />
                    ) : (
                        <ProfileDetailsForm
                            full_name={full_name}
                            setFullName={setFullName}
                            occupation={occupation}
                            setOccupation={setOccupation}
                            fun_fact={fun_fact}
                            setFunFact={setFunFact}
                            headline={headline}
                            setHeadline={setHeadline}
                            preference={preference}
                            setPreference={setPreference}
                            handleProfileSubmit={handleRegisterFormSubmit}
                            handleBack={handleBack}
                            errorMessage={errorMessage}
                        />
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};

export default RegisterPage;

