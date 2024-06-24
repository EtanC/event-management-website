/* eslint-disable react/prop-types */
import React from 'react';
import { TextField, Autocomplete, Box, IconButton } from '@mui/material';
import searchIcon from '../Image/search-icon.png';

const inputStyles = {
    borderRadius: '15px',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
    '& .MuiInputBase-input': { color: 'white' },
    '& .MuiFormLabel-root': { color: 'white' },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': { color: 'white' }
};

const SearchBar = ({ eventType, setEventType, location, setLocation, locations, date, setDate, handleSearch }) => (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', backgroundColor: '#1E4830', padding: '20px', borderRadius: '15px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '800px', gap: '10px' }}>
            <TextField
                label="Looking For"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ flex: 1, ...inputStyles }}
            />
            <Autocomplete
                options={locations}
                getOptionLabel={(option) => option}
                value={location}
                onChange={(e, newValue) => setLocation(newValue)}
                sx={{ flex: 1, ...inputStyles }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Location"
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
            <IconButton
                sx={{
                    backgroundColor: '#D6FA51',
                    color: '#FFFFFF',
                    '&:hover': { backgroundColor: '#D6FA51', color: '#FFFFFF' },
                    flexShrink: 0
                }}
                onClick={handleSearch}
            >
                <img src={searchIcon} alt="Search" style={{ width: '24px', height: '24px' }} />
            </IconButton>
        </Box>
    </Box>
);

export default SearchBar;
