import { Box, Typography, Modal, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../styles/Theme';
import { useNavigate } from 'react-router-dom';

const AdminUnauthorizedPopup = ({ open, handleClose }) => {
    const navigate = useNavigate();
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

    const handleContinue = () => {
        navigate('/');
        handleClose();
    };

    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="admin-unauthorized-modal-title"
                aria-describedby="admin-unauthorized-modal-description"
            >
                <Box sx={{ ...modalStyle, position: 'relative', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
                        <Typography id="admin-unauthorized-modal-title" variant="h5">
                            Unauthorized Access
                        </Typography>
                    </Box>
                    <Box sx={{ overflowY: 'auto', padding: '10px' }}>
                        <Typography id="admin-unauthorized-modal-description" variant="body1" component="div" sx={{ marginBottom: '16px' }}>
                            You do not have the necessary permissions to access this page.
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="primary" onClick={handleContinue}>
                            Go Back
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </ThemeProvider>
    );
};

export default AdminUnauthorizedPopup;
