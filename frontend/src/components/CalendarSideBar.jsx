import { useState } from 'react';
import { Box, Button } from '@mui/material';
import SearchBar from './calendarSideBarComponents/CalendarSearchBar';
import RankingCheckBox from './calendarSideBarComponents/RankingCheckBox';
import EventTypeCheckBox from './calendarSideBarComponents/EventTypeCheckBox';
import CreateEventPopUp from './CreateEventPopUp'

// eslint-disable-next-line react/prop-types, no-unused-vars
const CalendarSidebar = ({ events, onSearchResultClick, onRankingChange, refreshEvents }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRankings, setSelectedRankings] = useState([]);
    const [open, setOpen] = useState(false);

    const handleOpenNewEvent = () => {
        setOpen(true);
    };

    const handleCloseNewEvent = () => {
        setOpen(false);
        refreshEvents;
    };

    const handleRankingChange = (event) => {
        const ranking = event.target.name;
        setSelectedRankings(prev => {
            const updatedRankings = prev.includes(ranking)
                ? prev.filter(p => p !== ranking)
                : [...prev, ranking];
            onRankingChange(updatedRankings);
            return updatedRankings;
        });
    };

    return (
        <>
            <CreateEventPopUp open={open} handleClose={handleCloseNewEvent} headerText={'Create New Event'} refreshEvents={refreshEvents}/>
            <Box
                sx={{
                    width: { xs: '40%', sm: '250px', md: '300px' },
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRight: '1px solid #ddd',
                    flexShrink: 0,
                }}
            >
                <Button variant="contained" color="primary" onClick={handleOpenNewEvent} fullWidth sx={{ marginBottom: '20px' }}>
                    Create
                </Button>

                <SearchBar
                    events={events}
                    onSearchResultClick={onSearchResultClick}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <RankingCheckBox
                    selectedRankings={selectedRankings}
                    handleRankingChange={handleRankingChange}
                />

                <EventTypeCheckBox />
            </Box>
        </>
    );
};

export default CalendarSidebar;
