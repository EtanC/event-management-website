/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { TextField, Autocomplete, Box, FormControl, InputLabel, Select, MenuItem, Chip, Checkbox, ListItemText } from '@mui/material';

const inputStyles = {
    borderRadius: '15px',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#B2B6B6' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#B2B6B6' },
    '& .MuiInputBase-input': { color: '#B2B6B6' },
    '& .MuiFormLabel-root': { color: '#B2B6B6' },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': { color: '#B2B6B6' }
};

const chipContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: 0.5,
    maxHeight: '20px',
    overflow: 'hidden'
};

const SearchBar = ({ 
    labelOne, 
    labelTwo, 
    eventType, 
    setEventType, 
    location, 
    setLocation, 
    locations, 
    date, 
    setDate, 
    tags, 
    setTags,
    isSticky, 
}) => {
    return (
        <Box className={`search-bar ${isSticky ? 'sticky' : ''}`} 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                backgroundColor: '#1E4830', 
                padding: '20px', 
                borderRadius: '15px', 
                position: 'absolute', 
                top: {
                    xs: '100px',
                    sm: '450px'
                }, 
                left: '50%', 
                transform: 'translateX(-50%)', 
                zIndex: 2, 
                width: '90%',
                maxWidth: '800px',
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%', maxWidth: '800px', gap: '10px', flexDirection: {
                xs: 'column',
                sm: 'row'
            }}}>
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
                    onChange={(e, newValue) => setLocation(newValue || '')}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    sx={{ flex: 1, width: '100%', ...inputStyles }}
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
                <FormControl fullWidth variant="outlined" sx={{ flex: 1, ...inputStyles }}>
                    <InputLabel>Tags</InputLabel>
                    <Select
                        multiple
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        renderValue={(selected) => (
                            <Box sx={chipContainerStyles}>
                                {selected.map((value) => (
                                    <Chip
                                        key={value}
                                        label={value}
                                        sx={{
                                            backgroundColor: '#2E3B4E', // Change to match input background if needed
                                            color: '#B2B6B6', // Text color to match input text
                                            '& .MuiChip-deleteIcon': { color: '#B2B6B6' }, // Delete icon color
                                            '& .MuiChip-label': { color: '#B2B6B6' }, // Label text color
                                        }}
                                    />
                                ))}
                            </Box>
                        )}
                        label="Tags"
                        sx={{ flex: 1, borderRadius: '15px', '& .MuiOutlinedInput-notchedOutline': { borderRadius: '5px' } }}
                    >
                        {['Artificial Intelligence', 'Cybersecurity', 'Software Engineering', 'Data Science', 'Computer Networks', 'Human-Computer Interaction', 'Blockchain', 'Robotics', 'Cloud Computing', 'Quantum Computing', 'Computer Vision', 'Programming Languages', 'High Performance Computing'].map((tag) => (
                            <MenuItem key={tag} value={tag}>
                                <Checkbox checked={tags.indexOf(tag) > -1} />
                                <ListItemText primary={tag} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
};

export default SearchBar;
