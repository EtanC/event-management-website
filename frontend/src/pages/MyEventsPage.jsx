import { useState, useEffect } from 'react';
import { Box, Container, ToggleButton, ToggleButtonGroup  } from '@mui/material';
import CalendarSidebar from '../components/CalendarSideBar';
import ViewRegisteredEventPopUp from '../components/calendarMainComponents/ViewRegisteredEventPopUp';
import CalendarContainer from '../components/calendarMainComponents/CalendarContainer';
import sortEventRanking from '../helper/sortEventRanking';
import fetchRegisteredEvents from '../helper/fetchRegisteredEvents';
import '../styles/UserCalendar.css';
import theme from '../styles/Theme';
import { ThemeProvider } from '@mui/material/styles';
import MyEventsViewComponent from '../components/calendarMainComponents/MyEventsViewComponent'; // Create this component
import { fetchUserEvents } from '../helper/handleEventData';

const MyEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedRanking, setSelectedRanking] = useState([]);
    const [view, setView] = useState('calendar'); // new state to manage view

    useEffect(() => {
        fetchRegisteredEvents((fetchedEvents) => {
            setEvents(fetchedEvents);
            setFilteredEvents(fetchedEvents);
            setIsLoading(false);
        }, setError, setIsLoading);
    }, []);

    const refreshEvents = () => {
        fetchRegisteredEvents((fetchedEvents) => {
            setEvents(fetchedEvents);
            setFilteredEvents(fetchedEvents); 
            setIsLoading(false);
        }, setError, setIsLoading);
    };

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

    const handleEventClick = (event) => {
        setSelectedEvent(event.resource);
    };

    const handleSearchResultClick = (event) => {
        setSelectedEvent(event);
    };

    const handleClosePopUp = () => {
        setSelectedEvent(null);
        refreshEvents();
    };

    const handleRankingChange = (ranking) => {
        setSelectedRanking(ranking);
    };

    return (
        <>
            <ThemeProvider theme={theme}></ThemeProvider>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <CalendarSidebar
                    events={Array.isArray(events) ? events : []}
                    onSearchResultClick={handleSearchResultClick}
                    onRankingChange={handleRankingChange}
                    refreshEvents={refreshEvents}
                />
                <Container>
                    <ToggleButtonGroup
                        value={view}
                        exclusive
                        onChange={(event, newView) => {
                            if (newView !== null) {
                                setView(newView);
                            }
                        }}
                        sx={{ width: '100%', marginBottom: '20px' }}
                    >
                        <ToggleButton value="calendar" sx={{ flex: 1 }}>
                            Calendar
                        </ToggleButton>
                        <ToggleButton value="myEvents" sx={{ flex: 1 }}>
                            My Events
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {view === 'calendar' ? (
                        <CalendarContainer
                            isLoading={isLoading}
                            error={error}
                            calendarEvents={calendarEvents}
                            handleEventClick={handleEventClick}
                        />
                    ) : (
                        <MyEventsViewComponent
                            selectedRanking={selectedRanking}
                            refreshEvents={refreshEvents}
                        />
                    )}
                </Container>
            </Box>

            <ViewRegisteredEventPopUp
                selectedEvent={selectedEvent}
                handleClosePopUp={handleClosePopUp}
                refreshEvents={refreshEvents}
            />
        </>
    );
};

export default MyEventsPage;
