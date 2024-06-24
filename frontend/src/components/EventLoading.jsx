import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchEventsData from '../helper/fetchEventData';
import filterEvents from '../helper/filterEvent';
import SearchBar from '../assets/searchBar';
import EventCard from '../assets/eventCard';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';

function EventLoading() {
    const navigate = useNavigate();
    const [eventType, setEventType] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetchEventsData(setEvents, setLocations, setError, setIsLoading);
    }, []);

    const handleCardClick = (event) => {
        navigate(`/event/${event.name}`, { state: { event } });
    };

    const handleSearch = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setEvents(filterEvents(events, eventType, location, date));
        }, 2000);
    };

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', padding: '20px 0' }}>
            <SearchBar
                eventType={eventType}
                setEventType={setEventType}
                location={location}
                setLocation={setLocation}
                locations={locations}
                date={date}
                setDate={setDate}
                handleSearch={handleSearch}
            />

            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Typography variant="h6" color="error">
                        {error}
                    </Typography>
                </Box>
            ) : events.length === 0 ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Typography variant="h6" color="textSecondary">
                        No search results
                    </Typography>
                </Box>
            ) : (
                <Box sx={{ padding: 4 }}>
                    <Grid container spacing={2}>
                        {events.map((event, index) => (
                            <EventCard key={index} event={event} handleCardClick={handleCardClick} />
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
}

export default EventLoading;
