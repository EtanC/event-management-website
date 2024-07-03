import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import transformEvents from '../helper/sortEventPriority';
import { CircularProgress, Typography, Box, Container } from '@mui/material';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import mockEvents from '../helper/mockCalendarEvent';

const localizer = momentLocalizer(moment);

const eventColors = {
    1: '#ff0000', // Highest priority
    2: '#ff8c00',
    3: '#ffd700',
    0: '#808080', // No priority
};

const UserCalendar = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    /*
    useEffect(() => {
        fetchUserEvents(setEvents, setError, setIsLoading);
    }, []); */ // put this back after the backend api is done

    useEffect(() => {
        // Simulate fetching data with a delay
        setTimeout(() => {
            setEvents(mockEvents);
            setIsLoading(false);
        }, 1000);
        setError('');
    }, []);

    const calendarEvents = transformEvents(events);

    const eventStyleGetter = (event) => {
        const backgroundColor = eventColors[event.resource.priority] || '#808080';
        return {
            style: {
                backgroundColor,
                borderRadius: '5px',
                opacity: 0.8,
                color: 'white',
                border: '0px',
                display: 'block',
                cursor: 'pointer',
            }
        };
    };

    const handleEventClick = (event) => {
        navigate(`/event/${event.resource.id}`, { state: { event: event.resource } });
    };

    return (
        <>
            <Navbar />
            <Box sx={{ backgroundColor: '#f5f5f5', padding: '20px 0' }}>
                <Container maxWidth="lg">
                    <SearchBar 
                        eventType={''} 
                        setEventType={() => {}} 
                        location={''} 
                        setLocation={() => {}} 
                        locations={[]} 
                        date={''} 
                        setDate={() => {}} 
                    />
                    <Box sx={{ marginTop: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
                        {isLoading ? (
                            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                <CircularProgress />
                            </Box>
                        ) : error ? (
                            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                <Typography variant="h6" color="error">
                                    {error}
                                </Typography>
                            </Box>
                        ) : (
                            <Box sx={{ height: '70vh', width: '100%' }}>
                                <Calendar
                                    localizer={localizer}
                                    events={calendarEvents}
                                    startAccessor="start"
                                    endAccessor="end"
                                    eventPropGetter={eventStyleGetter}
                                    style={{ height: '100%' }}
                                    onSelectEvent={handleEventClick}
                                />
                            </Box>
                        )}
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default UserCalendar;
