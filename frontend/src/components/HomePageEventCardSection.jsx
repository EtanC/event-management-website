import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import filterEvents from '../helper/filterEvent';
import SearchBar from './SearchBar';
import EventCard from './EventCard';
import { Box, CircularProgress, Typography, Grid, IconButton, Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import fetchEventsData from '../helper/fetchEventData';


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
    const [totalFilteredEvents, setTotalFilteredEvents] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [isSticky, setIsSticky] = useState(false); // for filter bar to not disappear from sight
    const [selectedEvent, setSelectedEvent] = useState(null);
    // Debounce makes it so that we aren't spamming API calls everytime the search changes
    // Has a 300 ms delay for search
    function useDebounce(callback, delay) {
      const [timeoutId, setTimeoutId] = useState();
  
      useEffect(() => {
          return () => {
              clearTimeout(timeoutId);
          };
      }, [timeoutId]);
  
      function debouncedCallback(...args) {
          clearTimeout(timeoutId);
          setTimeoutId(setTimeout(() => {
              callback(...args);
          }, delay));
      }
  
      return debouncedCallback;
    }

    const debouncedFetchEventsData = useDebounce(fetchEventsData, 200);

    useEffect(() => {
      setIsLoading(true)
      debouncedFetchEventsData(setEvents, setLocations, setError, setIsLoading, page, setPageCount, eventType, location, date);
    }, [eventType, location, date]); 

    useEffect(() => {
      fetchEventsData(setEvents, setLocations, setError, setIsLoading, page, setPageCount, eventType, location, date)
    }, [page])

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
    console.log(events)
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
