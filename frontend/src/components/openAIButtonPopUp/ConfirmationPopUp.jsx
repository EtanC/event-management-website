import { Box, Typography, Modal, IconButton, Button } from '@mui/material';
import cross from '../../Image/close.png';

const ConfirmationPopup = ({ open, onClose, onConfirm, title, content, confirmText }) => {
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

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="confirmation-modal-title"
            aria-describedby="confirmation-modal-description"
        >
            <Box sx={modalStyle}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
                    <Typography id="confirmation-modal-title" variant="h5">
                        {title}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <img src={cross} alt="Close" style={{ width: '24px', height: '24px' }} />
                    </IconButton>
                </Box>
                <Box sx={{ padding: '10px' }}>
                    <Typography id="confirmation-modal-description" variant="body1" component="div" sx={{ marginBottom: '16px' }}>
                        {content}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={onConfirm}>
                        {confirmText}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmationPopup;
