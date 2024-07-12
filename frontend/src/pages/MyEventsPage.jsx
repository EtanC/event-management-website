import React, { useEffect, useState } from 'react';
import {
    Box, Container, Card, Typography, Grid, CircularProgress,
} from '@mui/material';
import { fetchUserEvents, fetchUserRegisteredEvents, handleDeleteEvent } from '../helper/handleEventData';
import EventCard from '../components/EventCard';
import AlertPopup from '../components/AlertPopup';
import { useNavigate } from 'react-router-dom';
import EventModal from '../components/EventModal';
import EventManagerModal from '../components/EventManagerModal';

function MyEvents() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [openEditEvent, setOpenEditEvent] = useState(false);
    const [openAddManager, setOpenAddManager] = useState(false);
    const [eventToEdit, setEventToEdit] = useState(null);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const eventData = await fetchUserEvents();
            setEvents(eventData || []);
            const registeredEventData = await fetchUserRegisteredEvents();
            setRegisteredEvents(registeredEventData || []);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch events:', error);
            setError('Failed to load events. Please try again later.');
            setLoading(false);
            setEvents([]);
            setRegisteredEvents([]);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleCardClick = (event) => {
        navigate(`/event/${event._id}`, { state: { event } });
    };

    const handleDeleteClick = (event) => {
        setEventToDelete(event);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (eventToDelete) {
            try {
                await handleDeleteEvent(eventToDelete._id);
                setDeleteDialogOpen(false);
                setEventToDelete(null);
                fetchEvents();
            } catch (error) {
                console.error('Failed to delete event:', error);
                alert('Failed to delete event. Please try again later.');
            }
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setEventToDelete(null);
    };

    const handleEditClick = (event) => {
        setEventToEdit(event);
        setOpenEditEvent(true);
    };

    const handleManagerClick = (event) => {
        setEventToEdit(event);
        setOpenAddManager(true);
    };

    const handleEditClose = () => {
        setOpenEditEvent(false);
        fetchEvents();
    }

    const handleAddManagerClose = () => {
        setOpenAddManager(false);
        fetchEvents();
    }

    const renderEventCards = (events, isCreatedEvents, isManagedEvents) => {
        if (loading) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                </Box>
            )
        }
        if (error) return <Typography color="error">{error}</Typography>;
        if (!events || events.length === 0) return <Typography>No events found.</Typography>;

        return (
            <Grid container spacing={2}>
                {events.map((event, index) => (
                    <EventCard
                        key={event._id || index}
                        event={event}
                        handleCardClick={handleCardClick}
                        isCreatedEvent={isCreatedEvents}
                        isManagedEvent={isManagedEvents}
                        onEditEvent={() => handleEditClick(event)}
                        onAddEventManager={() => handleManagerClick(event)}
                        onDeleteEvent={() => handleDeleteClick(event)}
                    />
                ))}
            </Grid>
        );
    };

    return (
        <>
            <AlertPopup
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                title={'Confirm Delete'}
                content={'Are you sure you want to delete this event? This action cannot be undone.'}
            />
            <EventModal open={openEditEvent} handleClose={handleEditClose} headerText={'Edit Event'} event={eventToEdit} />
            <EventManagerModal open={openAddManager} handleClose={handleAddManagerClose} event={eventToEdit} />
            <Box sx={{ backgroundColor: '#f5f5f5', paddingTop: '40px', minHeight: '90vh' }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" sx={{ marginBottom: '40px' }}>My Events</Typography>
                    <Card sx={styles.flexCard}>
                        <Typography variant="h6" component="h2" sx={styles.headerFont}>My Created Events</Typography>
                        {renderEventCards(events.createdEvents, true, false)}
                    </Card>
                    <Card sx={styles.flexCard}>
                        <Typography variant="h6" component="h2" sx={styles.headerFont}>My Managed Events</Typography>
                        {renderEventCards(events.managedEvents, false, true)}
                    </Card>
                    <Card sx={styles.flexCard}>
                        <Typography variant="h6" component="h2" sx={styles.headerFont}>My Registered Events</Typography>
                        {renderEventCards(registeredEvents, false, false)}
                    </Card>
                </Container>
            </Box>
        </>
    );
}

const styles = {
    flexbox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    flexCard: {
        marginBottom: '50px',
        borderRadius: '10px',
        padding: '30px',
        paddingBottom: '50px',
    },
    headerFont: {
        fontWeight: 'bold',
        fontSize: '18px',
        marginBottom: '40px',
    },
    button: {
        borderRadius: '25px',
        textTransform: 'none'
    },
};

export default MyEvents;