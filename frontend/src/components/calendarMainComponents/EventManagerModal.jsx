import React, { useState, useEffect } from 'react';
import {
    Modal,
    Fade,
    TextField,
    Card,
    Typography,
    Box,
    Button,
    IconButton,
    InputAdornment,
    Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { handleAddEventManager } from '../../helper/handleEventData'

const styles = {
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        padding: '30px',
        width: '600px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
    },
    search: {
        marginBottom: '20px',
    },
    closeIcon: {
        cursor: 'pointer',
    },
    button: {
        borderRadius: '25px',
        textTransform: 'none',
        width: '100%',
        height: '50px'
    },
};

const EventManagerModal = ({ open, handleClose, event }) => {
    const [searchEmail, setSearchEmail] = useState('')
    const [addedManagers, setAddedManagers] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (event) {
            setAddedManagers(event.authorized_users)
        }
        setSearchEmail('')
        setErrorMessage('')
    }, [event])

    const handleAdd = async () => {
        setErrorMessage('')
        if (searchEmail) {
            try {
                await handleAddEventManager(event._id, searchEmail);
                setAddedManagers(prevManagers => [...prevManagers, searchEmail]);
                setSearchEmail('');
            } catch (error) {
                console.error('Error adding event manager:', error);
                setErrorMessage('Invalid User Email.')
            }
        }
    }

    const handleChange = (e) => {
        setSearchEmail(e.target.value)
    }

    return (
        <Modal
            sx={styles.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Card sx={styles.card}>
                    {/* Header */}
                    <Box sx={styles.header}>
                        <Typography variant="h5">Add Event Managers</Typography>
                        <IconButton sx={styles.closeIcon} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Body */}
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Search Email"
                        value={searchEmail}
                        onChange={handleChange}
                        InputProps={{
                            sx: { borderRadius: '40px', mb: 2, width: '100%' },
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon />
                                </InputAdornment>)
                        }}
                    />
                    <Typography variant="b1">Added Event Managers</Typography>
                    <Box sx={{ padding: '20px', maxHeight: '200px', overflowY: 'auto', mb: 2 }}>
                        {addedManagers && addedManagers.length > 0 ? (
                            addedManagers.map((manager, index) => (
                                <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                                    {manager}
                                </Typography>
                            ))
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                No managers added yet.
                            </Typography>
                        )}
                    </Box>
                    {errorMessage && <Alert severity='error' sx={{ marginBottom: '20px' }}>{errorMessage}</Alert>}
                    <Button variant="contained" color="primary" sx={styles.button} onClick={handleAdd}>Add Email</Button>

                </Card>
            </Fade>
        </Modal>
    );
};

export default EventManagerModal;
