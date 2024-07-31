import React, { useState, useEffect } from 'react';
import {
    Button,
    Modal,
    Fade,
    TextField,
    Card,
    Grid,
    Typography,
    Box,
    Alert,
    Snackbar,
} from '@mui/material';
import PreferencesSelect from './PreferencesSelectBox.jsx';
import { handleCreateEvent, handleEditEvent } from '../helper/handleEventData.js';


const MAX_NAME_LENGTH = 100;

const styles = {
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    date: {
        borderRadius: '40px'
    },
    card: {
        padding: '30px',
        width: '600px'
    },
    textContainer: {
        display: 'flex',
        gap: '10px',
        marginBottom: 2,
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px'
    },
    button: {
        borderRadius: '25px',
        textTransform: 'none'
    },
};

const CreateEventPopUp = ({ open, handleClose, headerText, event, refreshEvents }) => {
    const [eventData, setEventData] = useState({
        name: '',
        location: '',
        start_date: '',
        deadline: '',
        details_link: '',
        details: '',
        tags: [],
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(() => {
        if (event) {
            setEventData({
                name: event.name || '',
                location: event.location || '',
                start_date: event.start_date || '',
                deadline: event.deadline || '',
                details_link: event.details_link || '',
                details: event.details || '',
                tags: event.tags || [],
            });
        }
    }, [event]);

    const handleSave = async () => {
        setErrorMessage(null)
        if (new Date(eventData.start_date) > new Date(eventData.deadline)) {
            setErrorMessage('Start date must be before the deadline');
            return;
        }
        if (new Date(eventData.start_date) < new Date()) {
            setErrorMessage('Start date cannot be in the past');
            return;
        }
        try {
            let result;
            if (event && event._id) {
                result = await handleEditEvent(event._id, eventData);
            }
            else result = await handleCreateEvent(eventData);
            if (result === 200) {
                setSnackbarMessage(`Event successfully ${event && event._id ? 'updated' : 'created'}!`);
                setSnackbarOpen(true);
                handleClose();
                refreshEvents();
                setEventData({
                    name: '',
                    location: '',
                    start_date: null,
                    deadline: null,
                    details_link: '',
                    details: '',
                    tags: [],
                });
            }
        } catch (error) {
            setErrorMessage(`Failed to ${event && event._id ? 'update' : 'save new'} event: ${error.message}`);
        }
        refreshEvents;
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    const handleChange = (e) => {
        if (Array.isArray(e)) {
            setEventData(prevState => ({
                ...prevState,
                tags: e
            }));
            return;
        }
        const { name, value } = e.target;
        // max character limit on event name
        if (name === 'name' && value.length > MAX_NAME_LENGTH) return;

        setEventData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleDateChange = (field) => (event) => {
        const inputDate = event.target.value;
        setEventData(prevState => ({
            ...prevState,
            [field]: inputDate,
        }));
    };

    return (
        <>
            <Modal
                sx={styles.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Card sx={styles.card}>
                        <Typography variant="h5" sx={{ mb: 4 }}>{headerText}</Typography>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Event Name"
                                    variant="outlined"
                                    required
                                    name="name"
                                    value={eventData.name}
                                    onChange={handleChange}
                                    InputProps={{ maxLength: MAX_NAME_LENGTH, sx: { borderRadius: '40px', mb: 2 }, }}
                                />
                                <TextField
                                    fullWidth
                                    label="Location"
                                    variant="outlined"
                                    required
                                    name="location"
                                    value={eventData.location}
                                    onChange={handleChange}
                                    InputProps={{ sx: { borderRadius: '40px', mb: 2, width: '100%' }, }}
                                />
                                <Box sx={styles.textContainer}>
                                    <TextField
                                        label="Start Date"
                                        name="start_date"
                                        type="date"
                                        required
                                        value={eventData.start_date}
                                        onChange={handleDateChange('start_date')}
                                        fullWidth
                                        InputLabelProps={{ shrink: true, }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '40px',
                                            },
                                        }}
                                    />
                                    <TextField
                                        label="Deadline"
                                        name="deadline"
                                        type="date"
                                        required
                                        value={eventData.deadline}
                                        onChange={handleDateChange('deadline')}
                                        fullWidth
                                        InputLabelProps={{ shrink: true, }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '40px',
                                            },
                                        }}
                                    />
                                </Box>
                                <TextField
                                    fullWidth
                                    label="Details Link"
                                    variant="outlined"
                                    name="details_link"
                                    required
                                    value={eventData.details_link}
                                    onChange={handleChange}
                                    InputProps={{ sx: { borderRadius: '40px', mb: 2 }, }}
                                />
                                <TextField
                                    fullWidth
                                    label="Details"
                                    variant="outlined"
                                    required
                                    multiline
                                    rows={4}
                                    name="details"
                                    value={eventData.details}
                                    onChange={handleChange}
                                    InputProps={{ sx: { borderRadius: '40px', mb: 2 }, }}
                                />
                                <PreferencesSelect
                                    value={eventData.tags}
                                    onChange={handleChange}
                                />
                            </Grid >
                        </Grid >
                        {errorMessage && <Alert severity='error' sx={{ marginBottom: '20px' }}>{errorMessage}</Alert>}
                        <Box sx={styles.buttonsContainer}>
                            <Button variant="outlined" color="primary" sx={styles.button} onClick={handleClose}>Cancel</Button>
                            <Button variant="contained" color="primary" sx={styles.button} onClick={handleSave}>Save Event</Button>
                        </Box>
                    </Card >
                </Fade >
            </Modal >
            <Snackbar open={snackbarOpen} autoHideDuration={6000}>
                <Alert onClose={handleSnackbarClose} severity={'success'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CreateEventPopUp;