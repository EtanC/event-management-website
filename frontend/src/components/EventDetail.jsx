import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Snackbar } from '@mui/material';
import { CalendarToday, Edit } from '@mui/icons-material';
import handleRegisterEvent from '../helper/handleRegisterEvent';
import { formatDate, getUserId } from '../helper/helpers'
import ViewRegisteredEventPopUp from '../components/calendarMainComponents/ViewRegisteredEventPopUp';
import fetchRegisteredEvents from '../helper/fetchRegisteredEvents';
import Alert from '@mui/material/Alert';

const EventDetail = ({ event, setEvent}) => {
    const [userCanEdit, setUserCanEdit] = useState(false);
    const formattedDate = formatDate(event.start_date);
    const [openEditEvent, setOpenEditEvent] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        const checkUserEditPermission = () => {
            const userId = getUserId();
            let isOwner
            if (event.creator === userId) isOwner = true
            else isOwner = false
            const isManager = event.authorized_users && event.authorized_users.includes(userId);
            setUserCanEdit(isOwner || isManager);
        };

        const checkIfRegistered = () => {
            fetchRegisteredEvents(
                (fetchedEvents) => {
                    const isEventRegistered = fetchedEvents.some(registeredEvent => registeredEvent._id === event._id);
                    setIsRegistered(isEventRegistered);
                },
                (error) => {
                    setAlert({ open: true, message: error, severity: 'error' });
                },
                () => {} // No need to set loading state here
            );
        };

        checkUserEditPermission();
        checkIfRegistered();
    }, [event]);

    const handleEditClick = () => {
        setOpenEditEvent(true);
    };

    const handleEditClose = () => {
        setOpenEditEvent(false);
    };

    const handleRegisterClick = async () => {
        const result = await handleRegisterEvent(event._id);
        setIsRegistered(result.success);
        setAlert({ open: true, message: result.message, severity: result.success ? 'success' : 'error' });
    };

    const handleAlertClose = () => {
        setAlert({ ...alert, open: false });
    };

    return (
        <>
            <ViewRegisteredEventPopUp open={openEditEvent} handleClose={handleEditClose} headerText={'Edit Event'} event={event} setEvent={setEvent} />
            <Box className="date-time-box" sx={{ position: 'absolute', top: '30%', left: '70%', transform: 'translate(-20%, -0%)', zIndex: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%' }}>
                    {userCanEdit && (
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<Edit />}
                            onClick={handleEditClick}
                            sx={{
                                marginBottom: 2,
                                borderRadius: '25px',
                                textTransform: 'none'
                            }}
                        >
                            Edit Event
                        </Button>
                    )}
                </Box>
                <Card sx={{ padding: '20px', width: '100%' }}>
                    <CardContent>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Date & time
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <CalendarToday sx={{ marginRight: '8px' }} />
                            <Typography variant="body1">{formattedDate}</Typography>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ textTransform: 'none', marginTop: '20px' }}
                            onClick={handleRegisterClick}
                            disabled={isRegistered}  // Disable the button if already registered
                        >
                            {isRegistered ? 'Already Registered' : 'Register'}
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{ textTransform: 'none', marginTop: '10px' }}
                        >
                            Program promoter
                        </Button>
                    </CardContent>
                </Card>
            </Box>

            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default EventDetail;