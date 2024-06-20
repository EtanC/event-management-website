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

const styles = {
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        maxWidth: 400,
        width: '100%',
        backgroundColor: 'white',
    },
    card: {
        padding: '30px',
        width: '600px'
    },
    textContainer: {
        display: 'flex',
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '20px'
    }
};

const NewEvent = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        // Implement save functionality here
        handleClose();
        // You can add your save logic here, such as sending data to an API or updating state.
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                New Event
            </Button>
            <Modal
                sx={styles.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Card sx={styles.card}>
                        <Typography variant="h5" gutterBottom>
                            Create New Event
                        </Typography>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Event Name"
                                    variant="outlined"
                                />
                                <Box sx={styles.textContainer}>
                                    <TextField
                                        fullWidth
                                        label="Location"
                                        variant="outlined"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Submission Deadline"
                                        variant="outlined"
                                    />
                                </Box>
                                <TextField
                                    fullWidth
                                    label="Registration Link"
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Description"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                />
                                <Typography>Add Tags</Typography>
                                <Typography>Add Image</Typography>
                            </Grid>
                            {/* Add more fields as needed */}
                        </Grid>
                        <Box sx={styles.buttonsContainer}>
                            <Button variant="outlined" color="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                Save
                            </Button>
                        </Box>
                    </Card>
                </Fade>
            </Modal>
        </div>
    );
};

export default NewEvent;
