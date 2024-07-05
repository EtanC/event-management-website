import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import AdminTable from '../components/AdminTable';

const AdminEventsPage = () => {
    const [eventName, setEventName] = useState('');
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [date, setDate] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    // Sample data
    const eventData = [
        { id: '001', eventName: 'Event 1', location: 'Sydney, Australia', eventDate: '11/06/2024' },
        { id: '002', eventName: 'Event 2', location: 'New York, USA', eventDate: '11/06/2024' },
    ];

    const filterEvents = (eventName) => {
        return eventData.filter(user => {
            const eventNameMatch = eventName === '' || user.eventName.toLowerCase().includes(eventName.toLowerCase());
            return eventNameMatch;
        });
    };

    useEffect(() => {
        const result = filterEvents(eventName);
        setFilteredData(result);
    }, [eventName]);

    const handleDelete = (eventId) => {
        console.log(`Event ${eventId} deleted`);
    };

    const handleEdit = (eventId) => {
        console.log(`Event ${eventId} edited`);
    };

    const columns = [
        { field: 'eventName', headerName: 'Event Name' },
        { field: 'location', headerName: 'Location' },
        { field: 'eventDate', headerName: 'Event Date' }
    ];

    return (
        <>
            <Navbar />
            <Box sx={{ backgroundColor: '#f5f5f5', padding: '40px 0', height: '90vh' }}>
                <Container maxWidth="lg">
                    <Box sx={styles.flexBox}>
                        <Typography variant="h4">
                            <MuiLink component={Link} to="/admin" sx={{ textDecoration: 'none', color: 'gray' }}>
                                Admin
                            </MuiLink>
                            {' > Events'}
                        </Typography>
                    </Box>
                    <SearchBar
                        labelOne='Event Name'
                        labelTwo='Location'
                        eventType={eventName}
                        setEventType={setEventName}
                        location={location}
                        setLocation={setLocation}
                        locations={locations}
                        date={date}
                        setDate={setDate}
                    />
                    {filteredData.length === 0 ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                            <Typography variant="h6" color="textSecondary">
                                No search results
                            </Typography>
                        </Box>
                    ) : (
                        <AdminTable
                            columns={columns}
                            data={filteredData}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    )}
                </Container>
            </Box>
        </>
    );
};

const styles = {
    flexBox: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 5
    }
};

export default AdminEventsPage;
