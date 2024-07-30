import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import EventCard from './EventCard';
import { Box, CircularProgress, Typography, Grid, IconButton, Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import fetchEventsData from '../helper/fetchEventData';
import { increaseEventViewCount } from '../helper/handleEventData';


function HomePageEventCardSection() {
    const navigate = useNavigate();
    const [eventType, setEventType] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [locations, setLocations] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [isSticky, setIsSticky] = useState(false); // for filter bar to not disappear from sight
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [tags, setTags] = useState([]);
    const [sortBy, setSortBy] = useState('alphabetical'); // default sort alphabetical

    // // Debounce makes it so that we aren't spamming API calls everytime the search changes
    // // Has a 200 ms delay for search
    // function useDebounce(callback, delay) {
    //     const [timeoutId, setTimeoutId] = useState();
    
    //     useEffect(() => {
    //         return () => {
    //             clearTimeout(timeoutId);
    //         };
    //     }, [timeoutId]);
    
    //     function debouncedCallback(...args) {
    //         clearTimeout(timeoutId);
    //         setTimeoutId(setTimeout(() => {
    //             callback(...args);
    //         }, delay));
    //     }
    
    //     return debouncedCallback;
    // }

    // const debouncedFetchEventsData = useDebounce(fetchEventsData, 200);

    // useEffect(() => {
    //     debouncedFetchEventsData(setEvents, setLocations, setError, setIsLoading, page, setPageCount, eventType, location, date, tags, sortBy);
    // }, [eventType, location, date, tags, sortBy, debouncedFetchEventsData, page]); 

    useEffect(() => {
        fetchEventsData(setEvents, setLocations, setError, setIsLoading, page, setPageCount, eventType, location, date, tags, sortBy)
    }, [date, eventType, location, page, sortBy, tags])

    useEffect(() => {
        setPage(1)
    }, [eventType, location, date, tags, sortBy])
    
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
    
    // cool animation for clicking open event card
    const handleCardClick = (event) => {
        setSelectedEvent(event);
        // increase view count for the event everytime it is opened
        increaseEventViewCount(event._id);
        setTimeout(() => {
            navigate(`/event/${event._id}`, { state: { event } });
        }, 500);
    };

    const handleNextPage = () => {
        setPage(prev => Math.min(prev + 1, pageCount));
    };

    const handlePreviousPage = () => {
        setPage(prev => Math.max(prev - 1, 1));
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
                tags={tags}
                setTags={setTags}   
                isSticky={isSticky}
            />
            {/* Buttons Containing toggle buttons for additional search options */}
            <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1}>
                <Button 
                    variant={sortBy === 'alphabetical' ? 'contained' : 'outlined'}
                    onClick={() => setSortBy('alphabetical')}
                >
                    Alphabetical
                </Button>
                <Button 
                    variant={sortBy === 'reverse' ? 'contained' : 'outlined'}
                    onClick={() => setSortBy('reverse')}
                >
                    Reverse Alphabetical
                </Button>
                <Button 
                    variant={sortBy === 'view_count' ? 'contained' : 'outlined'}
                    onClick={() => setSortBy('view_count')}
                >
                    View Count
                </Button>
            </Box>
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
            ) : events.length === 0 ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="30vh">
                    <Typography variant="h6" color="textSecondary">
                        No search results
                    </Typography>
                </Box>
            ) : (
                <Box sx={{ padding: 4 }}>
                    <Grid container spacing={2}>
                        {events.map((event, index) => (
                            <EventCard 
                                key={index} 
                                event={event} 
                                handleCardClick={handleCardClick} 
                                isSelected={selectedEvent === event}
                            />
                        ))}
                    </Grid>
                </Box>
            )}
            <Box display="flex" justifyContent="center" mt={2}>
              <div style={{display: 'flex', width: '100%',justifyContent: 'center'}}>
                  {page != 1 && <IconButton onClick={handlePreviousPage}>
                      <KeyboardArrowLeftIcon/>
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
                      <KeyboardArrowRightIcon/>
                  </IconButton>}
              </div>
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
