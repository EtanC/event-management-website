import { useState, useEffect } from 'react';
import { Box, CircularProgress, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { fetchUserPreferences } from '../helper/handleEventData';
import { useRef } from 'react';

const UserPreferenceEvent = ({ allEvents, eventType, location, date, tags }) => {
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isNearLeft, setIsNearLeft] = useState(false);
    const [isNearRight, setIsNearRight] = useState(false);
    const scrollIntervalRef = useRef(null);

    useEffect(() => {
        const getUserPreferences = async () => {
            try {
                const userTags = await fetchUserPreferences();
                const filtered = allEvents.filter(event => 
                    event.tags.some(tag => userTags.includes(tag)) &&
                    (!eventType || event.type === eventType) &&
                    (!location || event.location === location) &&
                    (!date || event.date === date) &&
                    (tags.length === 0 || tags.some(tag => event.tags.includes(tag)))
                );
                setFilteredEvents(filtered);
                setLoading(false);
            } catch (error) {
                console.error(`Tag fetching failed ${error.message}`);
                setLoading(false);
            }
        };
        getUserPreferences();
    }, [allEvents, eventType, location, date, tags]);

    const scroll = (direction) => {
        const container = document.getElementById('carouselContainer');
        const scrollAmount = direction === 'left' ? -200 : 200;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    const startAutoScroll = (direction) => {
        if (scrollIntervalRef.current) return; // Prevent multiple intervals
        scrollIntervalRef.current = setInterval(() => {
            scroll(direction);
        }, 100);
    };

    const stopAutoScroll = () => {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
    };

    const handleMouseMove = (e) => {
        const container = document.getElementById('carouselContainer');
        const { left, right } = container.getBoundingClientRect();
        const buffer = 50; // Distance from edge to start auto-scrolling
        if (e.clientX < left + buffer) {
            setIsNearLeft(true);
            setIsNearRight(false);
            startAutoScroll('left');
        } else if (e.clientX > right - buffer) {
            setIsNearRight(true);
            setIsNearLeft(false);
            startAutoScroll('right');
        } else {
            setIsNearLeft(false);
            setIsNearRight(false);
            stopAutoScroll();
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            stopAutoScroll(); // Cleanup interval on unmount
        };
    }, []);
    
    return (
        <Box sx={{ position: 'relative', marginBottom: '20px' }}>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                </Box>
            ) : (
                <Box display="flex" alignItems="center">
                    <IconButton onClick={() => scroll('left')}>
                        <ArrowBack />
                    </IconButton>
                    <Box
                        id="carouselContainer"
                        sx={{
                            display: 'flex',
                            overflowX: 'auto',
                            scrollBehavior: 'smooth',
                            width: 'calc(100% - 96px)', // Adjusting for button widths
                        }}
                    >
                        {filteredEvents.map((event, index) => (
                            <EventCard 
                                key={index} 
                                event={event}
                                handleCardClick={handleCardClick} 
                                isSelected={selectedEvent===event}
                            />
                        ))}
                    </Box>
                    <IconButton onClick={() => scroll('right')}>
                        <ArrowForward />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export default UserPreferenceEvent;
