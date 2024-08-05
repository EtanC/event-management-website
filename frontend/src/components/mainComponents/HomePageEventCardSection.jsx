import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../mainComponents/SearchBar';
import EventCard from '../eventDetailComponents/EventCard';
import { Box, CircularProgress, Typography, Grid, IconButton, Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import fetchEventsData from '../../helper/fetchEventData';
import { increaseEventViewCount, fetchUserPreferences } from '../../helper/handleEventData';
import UserPreferenceEvent from '../mainComponents/UserPreferenceEvents';
import { useProfile } from '../ProfileProvider';

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
    const [filteredEvents, setFilteredEvents] = useState([]);
    const { isAuthenticated } = useProfile();

    // user preferences, get preference and then filter event
    const fetchUserPreferencesAndFilterEvents = async (events) => {
        try {
            if (!Array.isArray(events) || events.length === 0) {
                setFilteredEvents([]);
                return;
            }
    
            const userPreferences = await fetchUserPreferences();
    
            if (!Array.isArray(userPreferences)) {
                console.error('Failed to fetch user preferences: Invalid response');
                setFilteredEvents([]);
                return;
            }
    
            const filtered = events.filter(event => 
                Array.isArray(event.tags) && event.tags.some(tag => userPreferences.includes(tag))
            );
    
            setFilteredEvents(filtered);
        } catch (error) {
            console.error(`Failed to fetch user preferences or filter events: ${error.message}`);
            setFilteredEvents([]);
        }
    };

    useEffect(() => {
        fetchEventsData(setEvents, setLocations, setError, setIsLoading, page, setPageCount, eventType, location, date, tags, sortBy);
    }, [date, eventType, location, page, sortBy, tags]);
    
    // monitor changes in user preference and the overall events
    useEffect(() => {
        if (isAuthenticated && events.length > 0) {
            fetchUserPreferencesAndFilterEvents(events);
        }
    }, [isAuthenticated, events]);

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
    const handleCardClick = (event, index, section) => {
        setSelectedEvent({ id: event._id, index, section }); // so that no two events are "the same"
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
                    sx={{ height: '45px', fontSize: {
                        xs: '10px',
                        sm: '12px'
                    } }}
                >
                    Alphabetical
                </Button>
                <Button 
                    variant={sortBy === 'reverse' ? 'contained' : 'outlined'}
                    onClick={() => setSortBy('reverse')}
                    sx={{ height: '45px', fontSize: {
                        xs: '10px',
                        sm: '12px'
                    } }}
                >
                    Reverse Alphabetical
                </Button>
                <Button 
                    variant={sortBy === 'view_count' ? 'contained' : 'outlined'}
                    onClick={() => setSortBy('view_count')}
                    sx={{ height: '45px', fontSize: {
                        xs: '10px',
                        sm: '12px'
                    } }}
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
                    {!isLoading && !error && events.length > 0 && isAuthenticated && (
                        <UserPreferenceEvent 
                            events={filteredEvents} 
                            handleCardClick={handleCardClick} 
                            selectedEvent={selectedEvent}
                        />
                    )}

                    <Typography
                        variant="h4" 
                        component="h2" 
                        gutterBottom 
                        sx={{ marginTop: '50px', marginBottom: '50px' }}
                    >
                        All Events
                    </Typography>
                    <Grid container spacing={2}>
                        {events.map((event, index) => (
                            <EventCard 
                                key={index} 
                                event={event} 
                                handleCardClick={() => handleCardClick(event, index, 'home')} 
                                isSelected={selectedEvent?.id === event._id && selectedEvent?.index === index && selectedEvent?.section === 'home'}
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
