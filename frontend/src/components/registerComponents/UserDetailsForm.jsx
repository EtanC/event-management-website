// UserDetailsForm.jsx
import React from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { validatePassword } from '../../helper/helpers';

const UserDetailsForm = ({ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, username, setUsername, errorMessage, handleNext, isLoading }) => (
    <Box
        component="form"
        onSubmit={handleNext}
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
            InputProps={{ sx: { borderRadius: '20px' } }}
        />
        <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            InputProps={{ sx: { borderRadius: '20px' } }}
            helperText="Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
        />
        <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            fullWidth
            InputProps={{ sx: { borderRadius: '20px' } }}
            disabled={!validatePassword(password)} // Disable until password is valid
        />
        <TextField
            label="User Name"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
            InputProps={{ sx: { borderRadius: '20px' } }}
        />
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ fontWeight: 'bold', borderRadius: '20px' }}>
            Next
        </Button>
    </Box>
);

export default UserDetailsForm;
