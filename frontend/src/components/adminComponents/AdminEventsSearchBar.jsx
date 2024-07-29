/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { TextField, Autocomplete, Box } from '@mui/material';

const inputStyles = {
    borderRadius: '15px',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#B2B6B6' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#B2B6B6' },
    '& .MuiInputBase-input': { color: '#B2B6B6' },
    '& .MuiFormLabel-root': { color: '#B2B6B6' },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': { color: '#B2B6B6' }
};


const AdminEventsSearchBar = ({ labelOne, labelTwo, eventType, setEventType, location, setLocation, locations }) => (
    <Box
        sx={{
            display: 'flex',
            alignContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '30px',
            backgroundColor: '#1E4830',
            padding: '20px',
            borderRadius: '15px',
            zIndex: 2,
            maxWidth: '800px',
        }}>
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
        </Box>
    </Box>
);

export default AdminEventsSearchBar;
