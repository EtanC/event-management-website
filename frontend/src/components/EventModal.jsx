import React, { useState } from 'react';
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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Tags from './Tags.jsx';
import { handleCreateEvent, handleEditEvent } from '../helper/handleEventData.js';

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

const VisuallyHiddenInput = styled('input')({
    height: 1,
    width: 1,
});

const EventModal = ({ open, handleClose, headerText, event }) => {
    const [dates, setDates] = useState({
        start_date: '',
        deadline: ''
    })
    const [eventData, setEventData] = useState({
        name: '',
        location: '',
        start_date: '',
        deadline: '',
        details_link: '',
        details: '',
        tags: [],
        image: null
    });
    const [errorMessage, setErrorMessage] = useState('')

    const handleSave = async () => {
        setErrorMessage(null)
        try {
            let result;
            if (event && event._id) result = await handleEditEvent(event._id, eventData);
            else result = await handleCreateEvent(eventData);

            if (result === 200) {
                handleClose();
                setEventData({
                    name: '',
                    location: '',
                    start_date: null,
                    deadline: null,
                    details_link: '',
                    details: '',
                    tags: [],
                    image: null
                });
            }
        } catch (error) {
            setErrorMessage(`Failed to ${event && event._id ? 'update' : 'save new'} event: ${error.message}`);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (field) => (event) => {
        const inputDate = event.target.value;
        const date = new Date(inputDate);
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

        setEventData(prevState => ({
            ...prevState,
            [field]: formattedDate,
        }));
        setDates(prevState => ({
            ...prevState,
            [field]: inputDate
        }));
    };
    const handleTagsChange = (tags) => {
        setEventData(prevState => ({
            ...prevState,
            tags: tags
        }));
    };

    const handleFileChange = (e) => {
        setEventData(prevState => ({
            ...prevState,
            image: e.target.files[0]
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
                        <Typography variant="h5" sx={{ mb: 4 }}>
                            {headerText}
                        </Typography>
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
                                    InputProps={{ sx: { borderRadius: '40px', mb: 2 }, }}
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
                                        value={dates.start_date}
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
                                        value={dates.deadline}
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
                                <Tags tags={eventData.tags} setTags={handleTagsChange} />
                                <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center', mb: 5 }}>
                                    <Button
                                        component="label"
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon />}
                                        sx={{ textTransform: 'none', borderRadius: '40px' }}
                                    >
                                        Upload Image
                                        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                                    </Button>
                                    {eventData.image && (
                                        <Typography>{eventData.image.name}</Typography>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                        {errorMessage && <Alert severity='error' sx={{ marginBottom: '20px' }}>{errorMessage}</Alert>}
                        <Box sx={styles.buttonsContainer}>
                            <Button variant="outlined" color="primary" sx={styles.button} onClick={handleClose}>Cancel</Button>
                            <Button variant="contained" color="primary" sx={styles.button} onClick={handleSave}>Save Event</Button>
                        </Box>
                    </Card>
                </Fade>
            </Modal>
        </>
    );
};

export default EventModal;