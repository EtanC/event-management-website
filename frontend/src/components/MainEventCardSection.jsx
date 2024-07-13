import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchEventsData from '../helper/fetchEventData';
import filterEvents from '../helper/filterEvent';
import SearchBar from './SearchBar';
import EventCard from './EventCard';
import { Box, CircularProgress, Typography, Grid, IconButton, Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

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
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        fetchEventsData(setEvents, setLocations, setError, setIsLoading, page, setPageCount);
    }, [page]);

    useEffect(() => {
        const result = filterEvents(events, eventType, location, date);
        setFilteredEvents(result.length > 0 ? result : events);
    }, [eventType, location, date, events]);

    const handleCardClick = (event) => {
        navigate(`/event/${event._id}`, { state: { event } });
        window.scrollTo(0, 0);
    };

    const handleNextPage = () => {
        setPage(page + 1)
    }

    const handlePreviousPage = () => {
        setPage(page - 1)
    }

    return (
        <Box sx={{ padding: '20px 0' }}>
            <SearchBar
                labelOne='Looking For'
                labelTwo='Location'
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
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                {page != 1 && <IconButton onClick={handlePreviousPage}>
                    <KeyboardArrowLeftIcon />
                </IconButton>}
                {page > 2 && <Button onClick={() => setPage(page - 2)}>
                    {page - 2}
                </Button>}
                {page > 1 && <Button onClick={() => setPage(page - 1)}>
                    {page - 1}
                </Button>}
                <Button variant="contained">
                    {page}
                </Button>
                {(page + 1 <= pageCount) && <Button onClick={() => setPage(page + 1)}>
                    {page + 1}
                </Button>}
                {(page + 2 <= pageCount) && <Button onClick={() => setPage(page + 2)}>
                    {page + 2}
                </Button>}
                {(page + 1 <= pageCount) && <IconButton onClick={handleNextPage}>
                    <KeyboardArrowRightIcon />
                </IconButton>}
            </div>
        </Box>

    );
}

export default MainEventCard;
