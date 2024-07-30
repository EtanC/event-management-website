import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Button } from '@mui/material';
import AdminEventsSearchBar from './AdminEventsSearchBar';
import AdminTable from './AdminTable';
import ActionConfirmationPopup from '../ActionConfirmationPopup';
import CreateEventPopUp from '../CreateEventPopUp';
import { fetchEventsData } from '../../helper/handleEventData';
import {
    handleDeleteClick,
    handleDeleteCancel,
    handleDeleteConfirm,
    handleEditClick,
    handleEditClose,
} from '../../helper/handleEditDeleteEvent';
import handleCrawlEvents from '../../helper/handleCrawlEvents';

const AdminEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [eventName, setEventName] = useState('');
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // delete and edit actions
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [eventToEdit, setEventToEdit] = useState(null);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [openEditEvent, setOpenEditEvent] = useState(false);

    const adminFetchEvents = async () => {
        try {
            setIsLoading(true);
            await fetchEventsData(setEvents, setLocations, setError, setIsLoading);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to fetch events:', error);
            setError('Failed to load events. Please try again later.');
            setIsLoading(false);
            setEvents([]);
        }
    };

    const filterEvents = (eventName) => {
        return events.filter(event => {
            const eventNameMatch = eventName === '' || event.name.toLowerCase().includes(eventName.toLowerCase());
            return eventNameMatch;
        });
    };

    useEffect(() => {
        const result = filterEvents(eventName);
        setFilteredData(result);
    }, [eventName, events]);

    useEffect(() => {
        adminFetchEvents();
    }, []);

    const columns = [
        { field: 'name', headerName: 'Event Name', width: '30vw' },
        { field: 'location', headerName: 'Location', width: '20vw' },
        { field: 'start_date', headerName: 'Event Date', width: '10vw' }
    ];

    return (
        <>
            <ActionConfirmationPopup
                open={deleteDialogOpen}
                onClose={() => handleDeleteCancel(setDeleteDialogOpen, setEventToDelete)}
                onConfirm={() => handleDeleteConfirm(eventToDelete, setDeleteDialogOpen, setEventToDelete, adminFetchEvents)}
                title={'Confirm Delete'}
                content={'Are you sure you want to delete this event? This action cannot be undone.'}
                primaryButtonText={'Delete'}
            />

            <CreateEventPopUp open={openEditEvent} handleClose={() => handleEditClose(setOpenEditEvent, adminFetchEvents)} headerText={'Edit Event'} event={eventToEdit} />
            <Container maxWidth="lg" sx={{ minHeight: '85vh' }}>
                <Box display="flex" justifyContent="center" mb={3}>
                    <Button variant='contained' onClick={handleCrawlEvents} sx={{ maxWidth: '200px' }}>Crawl New Events</Button>
                </Box>
                <AdminEventsSearchBar
                    labelOne='Event Name'
                    labelTwo='Location'
                    eventType={eventName}
                    setEventType={setEventName}
                    location={location}
                    setLocation={setLocation}
                    locations={locations}
                />
                {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
                        <Typography variant="h6" color="textSecondary">
                            Loading...
                        </Typography>
                    </Box>
                ) : filteredData.length === 0 ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
                        <Typography variant="h6" color="textSecondary">
                            No search results
                        </Typography>
                    </Box>
                ) : (
                    <AdminTable
                        columns={columns}
                        data={filteredData}
                        handleDelete={(event) => handleDeleteClick(event, setEventToDelete, setDeleteDialogOpen)}
                        handleEdit={(event) => handleEditClick(event, setEventToEdit, setOpenEditEvent)}
                        showActions={true}
                        showDropdown={false}
                    />
                )}
            </Container>
        </>
    );
};

export default AdminEventsPage;
