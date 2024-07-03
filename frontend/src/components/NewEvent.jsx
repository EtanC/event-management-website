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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Tags from './Tags.jsx';
import { createEvent } from '../helper/handleEventData.js';

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
        name: '',
        location: '',
        start_date: '',
        end_date: '',
        registration_link: '',
        details: '',
        tags: [],
        image: null
    });
    const [errorMessage, setErrorMessage] = useState('')

    const handleSave = async () => {
        console.log(eventData);
        try {
            const result = await createEvent(eventData)
            if (result === 200) {
                handleClose();
                setEventData(preState => ({
                    name: '',
                    location: '',
                    start_date: null,
                    end_date: null,
                    registration_link: '',
                    details: '',
                    tags: [],
                    image: null
                }));
            }
        } catch (error) {
            console.log(`Failed to save new event: ${error.message}`)
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (field) => (date_data) => {
        setEventData(prevState => ({
            ...prevState,
            [field]: date_data.$d
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
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Event Start Date"
                                            onChange={handleDateChange('start_date')}
                                            slotProps={{
                                                textField: { sx: { borderRadius: '40px', width: '400px', fieldset: { borderRadius: '40px' }, } }
                                            }}
                                        />
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Event End Date"
                                            onChange={handleDateChange('end_date')}
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
                                    name="registration_link"
                                    value={eventData.registration_link}
                                    onChange={handleChange}
                                    InputProps={{ sx: { borderRadius: '40px', mb: 2 }, }}
                                />
                                <TextField
                                    fullWidth
                                    label="Details"
                                    variant="outlined"
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

export default NewEvent;