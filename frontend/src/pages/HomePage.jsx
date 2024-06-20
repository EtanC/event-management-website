import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography, FormControl, Select, InputLabel, MenuItem, TextField, IconButton } from '@mui/material';
import Navbar from '../components/Navbar';
import EventLoading from '../components/EventLoading';
import defaultImage from './default-image.jpg';
import searchIcon from './search-icon.png'; 

function HomePage() {
    const navigate = useNavigate();
    const [eventType, setEventType] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [visibleEvents, setVisibleEvents] = useState(3);

    const handleImageClick = () => {
        navigate('/event/0');
    };

    const handleSearch = () => {
        console.log(`Search for: Type: ${eventType}, Location: ${location}, Date: ${date}`);
    };

    const handleLoadMore = () => {
        setVisibleEvents(visibleEvents + 6);
    };

    return (
        <>
            <Navbar />
            <Box sx={{ backgroundColor: '#f5f5f5', padding: '20px 0' }}>
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            position: 'relative',
                            cursor: 'pointer',
                            marginBottom: '20px',
                        }}
                        onClick={handleImageClick}
                    >
                        <img
                            src={defaultImage}
                            alt="Default Event"
                            style={{
                                width: '100%',
                                borderRadius: '8px',
                            }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', backgroundColor: '#1E4830', padding: '20px', borderRadius: '15px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '800px' }}>
                            <FormControl fullWidth variant="outlined" sx={{ marginRight: '10px', '& .MuiOutlinedInput-root': { borderColor: 'white', color: 'white', '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } } }}>
                                <InputLabel sx={{ color: 'white' }}>Looking For</InputLabel>
                                <Select
                                    label="Looking for"
                                    value={eventType}
                                    onChange={(e) => setEventType(e.target.value)}
                                    sx={{ borderRadius: '15px', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiSelect-icon': { color: 'white' }, '& .MuiMenuItem-root': { color: 'white' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                                >
                                    <MenuItem value="conference">Conference</MenuItem>
                                    <MenuItem value="workshop">Workshop</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth variant="outlined" sx={{ marginRight: '10px', '& .MuiOutlinedInput-root': { borderColor: 'white', color: 'white', '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } } }}>
                                <InputLabel sx={{ color: 'white' }}>Location</InputLabel>
                                <Select
                                    label="Location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    sx={{ borderRadius: '15px', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '& .MuiSelect-icon': { color: 'white' }, '& .MuiMenuItem-root': { color: 'white' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                                >
                                    <MenuItem value="boston">Boston</MenuItem>
                                    <MenuItem value="sydney">Sydney</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                variant="outlined"
                                sx={{ 
                                    '& .MuiOutlinedInput-root': { 
                                        borderRadius: '15px', 
                                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, 
                                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } 
                                    },
                                    '& .MuiInputBase-input': { color: 'white' }, 
                                    '& .MuiFormLabel-root': { color: 'white' }, 
                                    '& .MuiInputAdornment-root .MuiSvgIcon-root': { color: 'white' } 
                                }}
                            />
                            <IconButton
                                sx={{ marginLeft: '10px', backgroundColor: '#D6FA51', color: '#FFFFFF', '&:hover': { backgroundColor: '#D6FA51', color: '#FFFFFF' } }}
                                onClick={handleSearch}
                            >
                                <img src={searchIcon} alt="Search" style={{ width: '24px', height: '24px' }} />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <Typography variant="h4" component="div">Upcoming Events</Typography>
                        <Button variant="contained" color="primary" onClick={() => navigate("/create-event")}>Create event</Button>
                    </Box>
                    <EventLoading filters={{ eventType, location, date }} visibleEvents={visibleEvents} />
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button variant="outlined" onClick={handleLoadMore}>Load more...</Button>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default HomePage;
