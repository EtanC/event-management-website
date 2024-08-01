/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Snackbar } from '@mui/material';
import { CalendarToday, Edit } from '@mui/icons-material';
import handleRegisterEvent from '../helper/handleRegisterEvent';
import { formatDate, getUserId } from '../helper/helpers'
import ViewRegisteredEventPopUp from '../components/calendarMainComponents/ViewRegisteredEventPopUp';
import { fetchRegisteredEventsSimple } from '../helper/fetchRegisteredEvents';
import Alert from '@mui/material/Alert';
import { useProfile } from './ProfileProvider';
import { useNavigate } from 'react-router-dom';

const EventDetail = ({ event, setEvent }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userCanEdit, setUserCanEdit] = useState(false);
    const formattedDate = formatDate(event.start_date);
    const [openEditEvent, setOpenEditEvent] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const { isAuthenticated } = useProfile(); // global management
    const navigate = useNavigate();
    useEffect(() => {
        const checkUserEditPermission = () => {
            try {
                const userId = getUserId();
                let isOwner = event.creator === userId;
                const isManager = event.authorized_users && event.authorized_users.includes(userId);
                setUserCanEdit(isOwner || isManager);
            } catch (error) {
                setAlert(error)
            }
        };

        const checkIfRegistered = async () => {
            try {
                const fetchedEvents = await fetchRegisteredEventsSimple();
                const isEventRegistered = fetchedEvents.some(registeredEvent => registeredEvent._id === event._id);
                setIsRegistered(isEventRegistered);
            } catch (error) {
                setAlert({ open: true, message: 'Failed to check registration status', severity: 'error' });
            }
        };

        // if not authenticated then it shouldnt check 
        if (isAuthenticated) {
            checkIfRegistered();
            checkUserEditPermission();
        } else {
            setIsRegistered(false);
        }
    }, [event, isAuthenticated]);

    const handleEditClick = () => {
        setOpenEditEvent(true);
    };

    const handleEditClose = () => {
        setOpenEditEvent(false);
    };

    const handleRegisterClick = async () => {
        if (!isAuthenticated) {
            navigate('/login')
            return;
        }

        setIsLoading(true);
        try {
            const result = await handleRegisterEvent(event._id);
            setIsRegistered(result.success);
            setAlert({ open: true, message: result.message, severity: result.success ? 'success' : 'error' });
        } catch (error) {
            setAlert({ open: true, message: 'Registration failed. Please try again.', severity: 'error' });
        } finally {
            setIsLoading(false);
        }
    };
    const handleAlertClose = () => {
        setAlert({ ...alert, open: false });
    };

    return (
        <>
            <ViewRegisteredEventPopUp open={openEditEvent} handleClose={handleEditClose} headerText={'Edit Event'} event={event} setEvent={setEvent} />
            <Box className="date-time-box" sx={{ display: {
                xs: 'none',
                sm: 'block'
            }, position: 'absolute', top: '30%', left: '70%', transform: 'translate(-20%, -0%)', zIndex: 2 }}>
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
                            disabled={isRegistered || isLoading}  // Disable the button if already registered or loading
                        >
                            {isRegistered
                                ? 'Already Registered'
                                : isLoading
                                    ? 'Registering...'
                                    : (isAuthenticated
                                        ? 'Register'
                                        : 'Sign Up To Register For Event!'
                                    )} {/* if not signed in */}
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{ textTransform: 'none', marginTop: '10px' }}
                            href={event.conference_link}
                        >
                            Conference Website
                        </Button>
                    </CardContent>
                </Card>
            </Box>

            {/* making sure that the alert doesnt display for no reason */}
            <Snackbar open={alert.open && alert.message !== ''} autoHideDuration={3000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default EventDetail;