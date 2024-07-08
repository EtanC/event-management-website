import React, { useEffect, useState } from 'react';
import {
    Box, Container, Card, Typography, Grid, CircularProgress,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button
} from '@mui/material';
import Navbar from '../components/Navbar';
import { fetchUserCreatedEvents, fetchUserRegisteredEvents, handleDeleteEvent, handleEditEvent } from '../helper/handleEventData';
import EventCard from '../components/EventCard';
import { useNavigate } from 'react-router-dom';

function MyEvents() {
    const navigate = useNavigate();
    const [createdEvents, setCreatedEvents] = useState([]);
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const createdEventData = await fetchUserCreatedEvents();
            setCreatedEvents(createdEventData || []);
            const registeredEventData = await fetchUserRegisteredEvents();
            setRegisteredEvents(registeredEventData || []);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch events:', error);
            setError('Failed to load events. Please try again later.');
            setLoading(false);
            setCreatedEvents([]);
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
                // After successful deletion, refresh the events list
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

    const onEditEvent = (event) => {
        console.log('Edit event:', event);
        // Implement edit functionality here
    };

    const renderEventCards = (events, isCreatedEvents) => {
        if (loading) return <CircularProgress />;
        if (error) return <Typography color="error">{error}</Typography>;
        if (!events || events.length === 0) return <Typography>No events found.</Typography>;

        return (
            <Grid container spacing={2}>
                {events.map((event, index) => (
                    <EventCard
                        key={event._id || index}
                        event={event}
                        handleCardClick={handleCardClick}
                        isMyEventsPage={isCreatedEvents}
                        onEditEvent={onEditEvent}
                        onDeleteEvent={() => handleDeleteClick(event)}
                    />
                ))}
            </Grid>
        );
    };

    return (
        <>
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                PaperProps={{
                    style: {
                        padding: '20px',
                    },
                }}
            >
                <DialogTitle>{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this event? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="primary" sx={styles.button} onClick={handleDeleteCancel}>Cancel</Button>
                    <Button variant="contained" color="primary" sx={styles.button} onClick={handleDeleteConfirm}>Delete</Button>
                </DialogActions>
            </Dialog>
            <Navbar />
            <Box sx={{ backgroundColor: '#f5f5f5', padding: '40px 0', minHeight: '90vh' }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" sx={{ marginBottom: '40px' }}>My Events</Typography>
                    <Card sx={styles.flexCard}>
                        <Typography variant="h6" component="h2" sx={styles.headerFont}>My Hosted Events</Typography>
                        {renderEventCards(createdEvents, true)}
                    </Card>
                    <Card sx={styles.flexCard}>
                        <Typography variant="h6" component="h2" sx={styles.headerFont}>My Registered Events</Typography>
                        {renderEventCards(registeredEvents, false)}
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