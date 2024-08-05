import { TextField, Button, Box, FormControl, InputLabel, Alert } from '@mui/material';
import PreferencesSelect from '../calendarSideBarComponents/PreferencesSelectBox'; // Update the import path as needed

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
            <PreferencesSelect
                value={preference}
                onChange={setPreference}
            />
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
