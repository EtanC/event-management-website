/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { TextField, Autocomplete, Box } from '@mui/material';

const inputStyles = {
    borderRadius: '15px',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
    '& .MuiInputBase-input': { color: 'white' },
    '& .MuiFormLabel-root': { color: 'white' },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': { color: 'white' }
};

const SearchBar = ({ labelOne, labelTwo, eventType, setEventType, location, setLocation, locations, date, setDate }) => (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', backgroundColor: '#1E4830', padding: '20px', borderRadius: '15px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '800px', gap: '10px' }}>
            <TextField
                label={labelOne}
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ flex: 1, ...inputStyles }}
            />
            <Autocomplete
                options={locations.filter(loc => loc)}  // Ensure only available options are shown
                getOptionLabel={(option) => option}
                value={location}
                onChange={(e, newValue) => setLocation(newValue)}
                sx={{ flex: 1, ...inputStyles }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={labelTwo}
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <TextField
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="outlined"
                sx={{ flex: 1, ...inputStyles }}
            />
        </Box>
    </Box>
);

export default SearchBar;
