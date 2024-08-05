import React from 'react';
import { Select, OutlinedInput, MenuItem, Box, Chip, ListItemText, Checkbox } from '@mui/material';

const preferencesList = [
    "Artificial Intelligence",
    "Blockchain",
    "Cloud Computing",
    "Computer Networks",
    "Computer Vision",
    "Cybersecurity",
    "Data Science",
    "High Performance Computing",
    "Human-Computer Interaction",
    "Programming Languages",
    "Quantum Computing",
    "Robotics",
    "Software Engineering"
];

const PreferencesSelect = ({ value = [], onChange }) => (
    <Select
        multiple
        value={Array.isArray(value) ? value : []}
        onChange={(e) => onChange(e.target.value)}
        input={<OutlinedInput label="Preferences" />}
        renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((val) => (
                    <Chip key={val} label={val} />
                ))}
            </Box>
        )}
        fullWidth
        sx={{ borderRadius: '20px', marginBottom: '20px' }}
    >
        {preferencesList.map((preference) => (
            <MenuItem key={preference} value={preference}>
                <Checkbox checked={value.indexOf(preference) > -1} />
                <ListItemText primary={preference} />
            </MenuItem>
        ))}
    </Select>
);

export default PreferencesSelect;
