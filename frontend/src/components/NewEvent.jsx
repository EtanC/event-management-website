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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Tags from './Tags.jsx';

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
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const NewEvent = ({ open, handleClose }) => {
    const [eventData, setEventData] = useState({
        eventName: '',
        location: '',
        date: '',
        registrationLink: '',
        description: '',
        tags: [],
        image: null
    });

    const handleSave = () => {
        console.log(eventData);
        handleClose();
        // save the data into the database

        setEventData(preState => ({
            eventName: '',
            location: '',
            startDate: null,
            endDate: null,
            registrationLink: '',
            description: '',
            tags: [],
            image: null
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (date_data) => {
        setEventData(prevState => ({
            ...prevState,
            date: date_data.$d
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
                            Create New Event
                        </Typography>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Event Name"
                                    variant="outlined"
                                    required
                                    name="eventName"
                                    value={eventData.eventName}
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
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Event Start Date"
                                            onChange={handleDateChange}
                                            slotProps={{
                                                textField: { sx: { borderRadius: '40px', width: '400px', fieldset: { borderRadius: '40px' }, } }
                                            }}
                                        />
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Event End Date"
                                            onChange={handleDateChange}
                                            slotProps={{
                                                textField: { sx: { borderRadius: '40px', width: '400px', fieldset: { borderRadius: '40px' }, } }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Box>
                                <TextField
                                    fullWidth
                                    label="Registration Link"
                                    variant="outlined"
                                    name="registrationLink"
                                    value={eventData.registrationLink}
                                    onChange={handleChange}
                                    InputProps={{ sx: { borderRadius: '40px', mb: 2 }, }}
                                />
                                <TextField
                                    fullWidth
                                    label="Description"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    name="description"
                                    value={eventData.description}
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

export default NewEvent;