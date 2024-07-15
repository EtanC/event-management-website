import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEventsData } from '../helper/handleEventData';
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
    const [page, setPage] = useState(1);
    const [totalFilteredEvents, setTotalFilteredEvents] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [isSticky, setIsSticky] = useState(false); // for filter bar to not disappear from sight

    useEffect(() => {
        fetchEventsData(setEvents, setLocations, setError, setIsLoading);
    }, []);

    useEffect(() => {
        const result = filterEvents(events, eventType, location, date);
        setTotalFilteredEvents(result.length);
        setPageCount(Math.ceil(result.length / ITEMS_PER_PAGE));
        setFilteredEvents(result);
    }, [eventType, location, date, events]);

    // this hook make sure user gets transported to page 1 when any search happens
    useEffect(() => {
        setPage(1);
    }, [eventType, location, date]); 

    // this is to track where the filter bar is, when hit the nav bar then it stays
    useEffect(() => {
        const handleScroll = () => {
            const stickyPoint = 450;  // Define the Y-axis value at which the search bar should stick
    
            if (window.scrollY >= stickyPoint) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    

    const handleCardClick = (event) => {
        navigate(`/event/${event._id}`, { state: { event } });
    };

    const handleNextPage = () => {
        setPage(prev => Math.min(prev + 1, pageCount));
    };

    const handlePreviousPage = () => {
        setPage(prev => Math.max(prev - 1, 1));
    };

    // function to make sure theres only 5 buttons for pagination at a time
    const renderPaginationButtons = () => {
        const paginationButtons = [];
        const startPage = Math.max(1, page - 2);
        const endPage = Math.min(pageCount, startPage + 4);

        for (let i = startPage; i <= endPage; i++) {
            paginationButtons.push(
                <Button
                    key={i}
                    variant={page === i ? "contained" : "outlined"}
                    onClick={() => setPage(i)}
                    sx={{
                        border: 'none',
                        minWidth: '30px', 
                        padding: '0 8px', 
                    }}
                >
                    {i}
                </Button>
            );
        }

        return paginationButtons;
    };

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', padding: '20px 0' }}>
            <SearchBar
                className={`search-bar ${isSticky ? 'sticky' : ''}`}
                labelOne='Looking For'
                labelTwo='Location'
                eventType={eventType}
                setEventType={setEventType}
                location={location}
                setLocation={setLocation}
                locations={locations}
                date={date}
                setDate={setDate}
                isSticky={isSticky}
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
                        {filteredEvents.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE).map((event, index) => (
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
                {renderPaginationButtons()}
                {page < pageCount && (
                    <IconButton onClick={handleNextPage}>
                        <KeyboardArrowRightIcon />
                    </IconButton>
                )}
            </Box>
            <style> {/*style for filter bar so it doesnt disappear from sight */}
{`
                .sticky {
                    position: fixed;
                    top: 80px; /* height of navbar */
                    left: 50%;
                    transform: translateX(-50%);
                    width: 90%;
                    max-width: 800px;
                    z-index: 2;
                    background-color: #1E4830;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
            `}
            </style>
        </Box>
    );
}

export default HomePageEventCardSection;
