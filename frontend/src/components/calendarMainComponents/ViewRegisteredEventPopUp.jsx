/* eslint-disable react/prop-types */
import { Box, Typography, Modal, IconButton, Button } from '@mui/material';
import moment from 'moment';
import HtmlTagRender from '../HtmlTagRender';
import cross from '../../Image/close.png';
import { handleUnregister } from '../../helper/handleEventData';

const ViewRegisteredEventPopUp = ({ selectedEvent, handleClosePopUp, handleUnregister, fetchEvents }) => {
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

    const handleUnregisterClick = async (eventId) => {
        await handleUnregister(eventId);
        fetchEvents(); // Refetch events after unregistering
        handleClosePopUp(); // Close the modal after unregistering
    };

    return (
        <Modal
            open={!!selectedEvent}
            onClose={handleClosePopUp}
            aria-labelledby="event-modal-title"
            aria-describedby="event-modal-description"
        >
            <Box sx={{ ...modalStyle, position: 'relative', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1, paddingBottom: '16px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
                        {selectedEvent && (
                            <Typography id="event-modal-title" variant="h4" sx={{ padding: '0 16px' }}>
                                {selectedEvent.name}
                            </Typography>
                        )}
                        <IconButton onClick={handleClosePopUp}>
                            <img src={cross} alt="Close" style={{ width: '24px', height: '24px' }} />
                        </IconButton>
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
                <Box sx={{ padding: '16px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={async () => {
                            await handleUnregister(selectedEvent._id);
                            fetchEvents();
                            handleClosePopUp(); // Close the modal after unregistering
                        }}
                        fullWidth
                        sx={{ marginBottom: '20px' }}
                    >
                        Unregister
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ViewRegisteredEventPopUp;
