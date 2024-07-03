import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEventsData } from '../helper/handleEventData';
import filterEvents from '../helper/filterEvent';
import SearchBar from './SearchBar';
import EventCard from './EventCard';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';

function MainEventCard() {
    const navigate = useNavigate();
    const [eventType, setEventType] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetchEventsData(setEvents, setLocations, setError, setIsLoading);
    }, []);

    useEffect(() => {
        const result = filterEvents(events, eventType, location, date);
        setFilteredEvents(result.length > 0 ? result : events);
    }, [eventType, location, date, events]);

    const handleCardClick = (event) => {
        navigate(`/event/${event.name}`, { state: { event } });
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
            />

            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="top" height="100vh">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Typography variant="h6" color="error">
                        {error}
                    </Typography>
                </Box>
            ) : filteredEvents.length === 0 ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Typography variant="h6" color="textSecondary">
                        No search results
                    </Typography>
                </Box>
            ) : (
                <Box sx={{ padding: 4 }}>
                    <Grid container spacing={2}>
                        {filteredEvents.map((event, index) => (
                            <EventCard key={index} event={event} handleCardClick={handleCardClick} />
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
}

export default MainEventCard;
