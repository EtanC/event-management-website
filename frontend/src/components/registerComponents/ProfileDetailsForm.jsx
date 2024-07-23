import React from 'react';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Chip, OutlinedInput, Alert } from '@mui/material';

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
            <InputLabel>Preferences</InputLabel>
            <Select
                multiple
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
                input={<OutlinedInput label="Preferences" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                fullWidth
                sx={{ borderRadius: '20px' }}
            >
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Artificial Intelligence">Artificial Intelligence</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="UX/UI">UX/UI</MenuItem>
            </Select>
        </FormControl>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Box sx={{ display: 'flex', gap: '10px' }}>
            <Button variant="outlined" fullWidth onClick={handleBack} sx={{ borderRadius: '20px' }}>Back</Button>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ fontWeight: 'bold', borderRadius: '20px' }}>
                Submit
            </Button>
        </Box>
        <Button variant="text" fullWidth sx={{ mt: 2 }} onClick={handleProfileSubmit}>Skip for Now</Button>
    </Box>
);

export default ProfileCreationForm;
