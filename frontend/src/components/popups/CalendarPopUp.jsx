/* eslint-disable react/prop-types */
import { Box, Typography, Modal, IconButton, Button } from '@mui/material';
import moment from 'moment';
import HtmlTagRender from '../eventDetailComponents/HtmlTagRender';
import cross from '../Image/close.png';
import { unregisterEvent } from '../helper/fetchUserEvents';

const CalendarPopUp = ({ selectedEvent, handleCloseModal, updateEvents, setAlert }) => {
    const modalStyle = {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        width: '80%',
        maxWidth: '500px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        outline: 'none',
        maxHeight: '80vh',
        overflowY: 'auto',
    };

    const handleUnregister = async () => {
        try {
            await unregisterEvent(selectedEvent._id);
            handleCloseModal();
            updateEvents();
            setAlert({ open: true, message: 'Successfully unregistered from event', severity: 'success' });
        } catch (error) {
            setAlert({ open: true, message: 'Failed to unregister from event', severity: 'error' });
        }
    };

    return (
        <Modal
            open={!!selectedEvent}
            onClose={handleCloseModal}
            aria-labelledby="event-modal-title"
            aria-describedby="event-modal-description"
        >
            <Box sx={{ ...modalStyle, position: 'relative', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1, paddingBottom: '16px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                        {selectedEvent && (
                            <Typography id="event-modal-title" variant="h5">
                                {selectedEvent.name}
                            </Typography>
                        )}
                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            <IconButton onClick={handleCloseModal}>
                                <img src={cross} alt="Close" style={{ width: '24px', height: '24px' }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ overflowY: 'auto', padding: '16px' }}>
                    {selectedEvent && (
                        <Box>
                            <Typography id="event-modal-description" variant="body1" component="div" sx={{ marginBottom: '16px' }}>
                                <HtmlTagRender htmlString={selectedEvent.details} />
                            </Typography>
                            <Typography variant="subtitle1">
                                Start Date: {moment(selectedEvent.start_date).format('MMMM Do YYYY')}
                            </Typography>
                            <Typography variant="subtitle1">
                                End Date: {moment(selectedEvent.deadline).format('MMMM Do YYYY')}
                            </Typography>
                        </Box>
                    )}
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: '20px' }}
                    onClick={handleUnregister}
                >
                    Unregister
                </Button>
            </Box>
        </Modal>
    );
};

export default CalendarPopUp;
