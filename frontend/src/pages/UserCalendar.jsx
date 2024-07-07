import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import sortEventRanking from '../helper/sortEventRanking';
import fetchRegisteredEvents from '../helper/fetchRegisteredEvents';
import { CircularProgress, Typography, Box, Container, Modal, IconButton } from '@mui/material';
import Navbar from '../components/Navbar';
import CalendarSidebar from '../components/CalendarSideBar';
import '../styles/UserCalendar.css';
import bin from '../Image/bin.png';
import edit from '../Image/edit.png';
import cross from '../Image/close.png';
import HtmlTagRender from '../components/HtmlTagRender';

const localizer = momentLocalizer(moment);

const eventColors = {
    4: '#FA5151', // Highest Ranking
    3: '#FAA251',
    2: '#F7CD61',
    1: '#B8E0B8',
    0: '#808080', // No Ranking
};

const UserCalendar = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedRanking, setSelectedRanking] = useState([]);

    useEffect(() => {
        fetchRegisteredEvents((fetchedEvents) => {
            setEvents(fetchedEvents);
            setFilteredEvents(fetchedEvents); 
            setIsLoading(false);
        }, setError, setIsLoading);
    }, []);

    useEffect(() => {
        const rankingMap = {
            'A+': 4,
            'A': 3,
            'B': 2,
            'C': 1,
            'Unspecified': 0,
        };
    
        const filterByRanking = (events, ranking) => {
            if (!Array.isArray(events)) { // return empty when nothing is found
                return [];
            }

            if (ranking.length === 0) return events; // return all if no Ranking selected
            
            const RankingValues = ranking.map(Ranking => rankingMap[Ranking]);
            return events.filter(event => RankingValues.includes(event.ranking));
        };
    

        const filtered = filterByRanking(events, selectedRanking);
        setFilteredEvents(filtered);
    }, [events, selectedRanking]);
    
    const calendarEvents = sortEventRanking(filteredEvents);

    const eventStyleGetter = (event) => {
        const backgroundColor = eventColors[event.resource.ranking];
        return {
            style: {
                backgroundColor,
                borderRadius: '5px',
                opacity: 0.8,
                color: 'white',
                border: '1px solid #ddd',
                display: 'block',
                cursor: 'pointer',
                padding: '2px 4px',          // Add padding
                textAlign: 'center',         // Center text
                overflow: 'hidden',          // Prevent text overflow
                whiteSpace: 'nowrap',        // Prevent text wrapping
                textOverflow: 'ellipsis',    // Show ellipsis for overflow
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

    const handleRankingChange = (ranking) => {
        setSelectedRanking(ranking);
    };

    const modalStyle = {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        width: '80%',
        maxWidth: '500px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        outline: 'none',
        maxHeight: '80vh',
        overflowY: 'auto',
    };
    
    return (
        <>
            <Navbar />
            <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
                <CalendarSidebar 
                    events={Array.isArray(events) ? events : []} 
                    onSearchResultClick={handleSearchResultClick} 
                    onRankingChange={handleRankingChange} 
                />
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
                                    events={calendarEvents.length ? calendarEvents : []}
                                    startAccessor="start"
                                    endAccessor="end"
                                    eventPropGetter={eventStyleGetter}
                                    style={{ height: '100%' }}
                                    onSelectEvent={handleEventClick}
                                    views={['month', 'week', 'day', 'agenda']}
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
                <Box sx={{ ...modalStyle, position: 'relative', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1, paddingBottom: '16px' }}>
                        <Box sx={{ position: 'relative', display: 'flex', gap: '10px', justifyContent: 'flex-end', padding: '8px' }}>
                            <IconButton>
                                <img src={edit} alt="Edit" style={{ width: '24px', height: '24px' }} />
                            </IconButton>
                            <IconButton>
                                <img src={bin} alt="Delete" style={{ width: '24px', height: '24px' }} />
                            </IconButton>
                            <IconButton onClick={handleCloseModal}>
                                <img src={cross} alt="Close" style={{ width: '24px', height: '24px' }} />
                            </IconButton>
                        </Box>
                        {selectedEvent && (
                            <Box sx={{ padding: '0 16px' }}>
                                <Typography id="event-modal-title" variant="h5">
                                    {selectedEvent.name}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Box sx={{ overflowY: 'auto', padding: '16px' }}>
                        {selectedEvent && (
                            <Box>
                                <Typography id="event-modal-description" variant="body1" component="div" sx={{ marginBottom: '16px' }}>
                                    <HtmlTagRender htmlString={selectedEvent.details} />
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
                </Box>
            </Modal>
        </>
    );
};

export default UserCalendar;
