import { useState, useEffect, useRef, useCallback } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { fetchUserPreferences } from '../helper/handleEventData';
import EventCard from './EventCard';

const UserPreferenceEvent = ({ events, handleCardClick, selectedEvent }) => {
    const [filteredEvents, setFilteredEvents] = useState([]);
    const containerRef = useRef(null);

    const getUserPreferencesAndFilterEvents = useCallback(async () => {
        try {
            const userPreferences = await fetchUserPreferences();
            const filtered = events.filter(event => 
                event.tags.some(tag => userPreferences.includes(tag))
            );
            setFilteredEvents(filtered);
        } catch (error) {
            console.error(`Failed to fetch user preferences or filter events: ${error.message}`);
            setFilteredEvents([]);
        }
    }, [events]);


    useEffect(() => {
        getUserPreferencesAndFilterEvents();
    }, [getUserPreferencesAndFilterEvents]);

    const scroll = (direction) => {
        const container = containerRef.current;
        const scrollAmount = direction === 'left' ? -200 : 200;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    return (
        <Box sx={{ 
            position: 'relative', 
            marginBottom: '20px',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom 
                sx={{marginBottom: '50px'}}
            >
                Recommended Events
            </Typography>
            <Box display="flex" alignItems="center">
                <IconButton onClick={() => scroll('left')}>
                    <ArrowBack />
                </IconButton>
                <Box
                    id="carouselContainer"
                    ref={containerRef}
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollBehavior: 'smooth',
                        width: 'calc(100% - 96px)',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        '-ms-overflow-style': 'none',
                        'scrollbar-width': 'none',
                        gap: '16px',
                        padding: '16px'
                    }}
                >
                    {filteredEvents.map((event, index) => (
                        <EventCard 
                            key={index} 
                            event={event}
                            handleCardClick={() => handleCardClick(event, index, 'userPreference')} 
                            isSelected={selectedEvent?.id === event._id && selectedEvent?.index === index && selectedEvent?.section === 'userPreference'}
                        />
                    ))}
                </Box>
                <IconButton onClick={() => scroll('right')}>
                    <ArrowForward />
                </IconButton>
            </Box>
        </Box>
    );
};

export default UserPreferenceEvent;
