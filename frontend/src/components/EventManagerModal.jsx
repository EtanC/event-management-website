import React, { useState } from 'react';
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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

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

const EventManagerModal = ({ open, handleClose }) => {
    const [searchEmail, setSearchEmail] = useState('')

    const handleSave = () => {
        console.log('save')
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
                    <Box sx={{ padding: '50px' }}>

                    </Box>
                    <Button variant="contained" color="primary" sx={styles.button} onClick={handleSave}>Add Email</Button>

                </Card>
            </Fade>
        </Modal>
    );
};

export default EventManagerModal;
