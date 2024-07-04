import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import sortEventPriority from '../helper/sortEventPriority';
import fetchRegisteredEvents from '../helper/fetchRegisteredEvents';
import { CircularProgress, Typography, Box, Container } from '@mui/material';
import Navbar from '../components/Navbar';
import CalendarSidebar from '../components/CalendarSideBar';
import '../styles/UserCalendar.css';

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

    useEffect(() => {
        fetchRegisteredEvents(setEvents, setError, setIsLoading);
    }, []);

    const calendarEvents = sortEventPriority(events);

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
            <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
                <CalendarSidebar />
                <Container maxWidth="lg" sx={{ flexGrow: 1, padding: 0 }}>
                    <Box sx={{ marginTop: '20px', height: '100%', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
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
                            <Box sx={{ height: '100%', width: '100%' }}>
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
