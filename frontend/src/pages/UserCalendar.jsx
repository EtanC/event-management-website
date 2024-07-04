import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import sortEventPriority from '../helper/sortEventPriority';
import fetchRegisteredEvents from '../helper/fetchRegisteredEvents';
import { CircularProgress, Typography, Box, Container, Modal, IconButton } from '@mui/material';
import Navbar from '../components/Navbar';
import CalendarSidebar from '../components/CalendarSideBar';
import '../styles/UserCalendar.css';
import bin from '../Image/bin.png';
import edit from '../Image/edit.png';
import cross from '../Image/close.png';

const localizer = momentLocalizer(moment);

const eventColors = {
    1: '#ff0000', // Highest priority
    2: '#ff8c00',
    3: '#ffd700',
    0: '#808080', // No priority
};

const UserCalendar = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

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
        setSelectedEvent(event.resource);
    };

    const handleSearchResultClick = (event) => {
        setSelectedEvent(event);
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
    };

    const modalStyle = {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        width: '80%',
        maxWidth: '600px',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        outline: 'none',
    };

    return (
        <>
            <Navbar />
            <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
                <CalendarSidebar events={events} onSearchResultClick={handleSearchResultClick} />
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

            <Modal
                open={!!selectedEvent}
                onClose={handleCloseModal}
                aria-labelledby="event-modal-title"
                aria-describedby="event-modal-description"
            >
                <Box sx={{ ...modalStyle, position: 'relative' }}>
                    <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <img src={cross} alt="Close" />
                    </IconButton>
                    <IconButton sx={{ position: 'absolute', top: '10px', right: '50px' }}>
                        <img src={edit} alt="Edit" />
                    </IconButton>
                    <IconButton sx={{ position: 'absolute', top: '10px', right: '90px' }}>
                        <img src={bin} alt="Delete" />
                    </IconButton>
                    {selectedEvent && (
                        <Box>
                            <Typography id="event-modal-title" variant="h4">
                                {selectedEvent.name}
                            </Typography>
                            <Typography id="event-modal-description" variant="body1">
                                {selectedEvent.details}
                            </Typography>
                            <Typography variant="subtitle1">
                                Start Date: {moment(selectedEvent.start_date).format('MMMM Do YYYY')}
                            </Typography>
                            <Typography variant="subtitle1">
                                End Date: {moment(selectedEvent.deadline).format('MMMM Do YYYY')}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default UserCalendar;
