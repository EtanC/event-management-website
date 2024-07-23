// ProfileCreationForm.jsx
import React from 'react';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Avatar, Alert } from '@mui/material';

const ProfileCreationForm = ({ fullName, setFullName, occupation, setOccupation, funFact, setFunFact, headline, setHeadline, preference, setPreference, handleProfileSubmit, handleBack, errorMessage }) => (
    <Box
        component="form"
        onSubmit={handleProfileSubmit}
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 2,
        }}
    >
        <TextField
            label="Full Name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
            InputProps={{ sx: { borderRadius: '20px' } }}
        />
        <TextField
            label="Headline"
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            fullWidth
            InputProps={{ sx: { borderRadius: '20px' } }}
            helperText="Eg. Final-Year Computer Science Student from UNSW"
        />
        <TextField
            label="Job Occupation"
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            fullWidth
            InputProps={{ sx: { borderRadius: '20px' } }}
        />
        <TextField
            label="Fun Fact"
            type="text"
            value={funFact}
            onChange={(e) => setFunFact(e.target.value)}
            fullWidth
            InputProps={{ sx: { borderRadius: '20px' } }}
        />
        <FormControl fullWidth>
            <InputLabel>Preference</InputLabel>
            <Select
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
                required
                fullWidth
                sx={{ borderRadius: '20px' }}
            >
                <MenuItem value="Music">Music</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Technology">Technology</MenuItem>
                <MenuItem value="Art">Art</MenuItem>
            </Select>
        </FormControl>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Box sx={{ display: 'flex', gap: '10px' }}>
            <Button variant="outlined" fullWidth onClick={handleBack} sx={{ borderRadius: '20px' }}>Back</Button>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ fontWeight: 'bold', borderRadius: '20px' }}>
                Submit
            </Button>

        </Box>
        <Button>Skip for Now</Button>
    </Box>
);

export default ProfileCreationForm;
