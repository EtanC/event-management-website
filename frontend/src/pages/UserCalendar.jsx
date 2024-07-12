import { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import CalendarSidebar from '../components/CalendarSideBar';
import CalendarPopUp from '../components/calendarMainComponents/CalendarPopUp';
import CalendarContainer from '../components/calendarMainComponents/CalendarContainer';
import sortEventRanking from '../helper/sortEventRanking';
import fetchRegisteredEvents from '../helper/fetchRegisteredEvents';
import '../styles/UserCalendar.css';
import theme from '../styles/Theme';
import { ThemeProvider } from '@mui/material/styles';

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

    return (
        <>
            <ThemeProvider theme={theme}></ThemeProvider>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <CalendarSidebar
                    events={Array.isArray(events) ? events : []}
                    onSearchResultClick={handleSearchResultClick}
                    onRankingChange={handleRankingChange}
                />
                <Container>
                    <CalendarContainer
                        isLoading={isLoading}
                        error={error}
                        calendarEvents={calendarEvents}
                        handleEventClick={handleEventClick}
                    />
                </Container>
            </Box>

            <CalendarPopUp
                selectedEvent={selectedEvent}
                handleCloseModal={handleCloseModal}
            />
        </>
    );
};

export default UserCalendar;
