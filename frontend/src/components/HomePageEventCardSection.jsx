import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchEventsData from '../helper/fetchEventData';
import filterEvents from '../helper/filterEvent';
import SearchBar from './SearchBar';
import EventCard from './EventCard';
import { Box, CircularProgress, Typography, Grid, IconButton, Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const ITEMS_PER_PAGE = 6; // customise this

function HomePageEventCardSection() {
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
    const [totalFilteredEvents, setTotalFilteredEvents] = useState(0);
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        fetchEventsData(setEvents, setLocations, setError, setIsLoading, page, setPageCount);
    }, [page]);

    useEffect(() => {
        const result = filterEvents(events, eventType, location, date);
        setTotalFilteredEvents(result.length);
        setFilteredEvents(result.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE));
        setPageCount(Math.ceil(result.length / ITEMS_PER_PAGE));
    }, [eventType, location, date, events, page]);

    const handleCardClick = (event) => {
        navigate(`/event/${event._id}`, { state: { event } });
    };

    const handleNextPage = () => {
        setPage(prev => Math.min(prev + 1, pageCount));
    }

    const handlePreviousPage = () => {
        setPage(prev => Math.min(prev - 1, pageCount));
    }

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', padding: '20px 0' }}>
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
            ) : totalFilteredEvents === 0 ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="30vh">
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
            <Box display="flex" justifyContent="center" mt={2}>
                {page > 1 && (
                    <IconButton onClick={handlePreviousPage}>
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                )}
                {[...Array(pageCount)].map((_, index) => (
                    <Button
                        key={index}
                        variant={page === index + 1 ? "contained" : "outlined"}
                        onClick={() => setPage(index + 1)}
                    >
                        {index + 1}
                    </Button>
                ))}
                {page < pageCount && (
                    <IconButton onClick={handleNextPage}>
                        <KeyboardArrowRightIcon />
                    </IconButton>
                )}
            </Box>
        </Box>

    );
}

export default HomePageEventCardSection;
