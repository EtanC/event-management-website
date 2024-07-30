/* eslint-disable react/prop-types */
import { Box, Typography, Modal, IconButton, Button } from '@mui/material';
import cross from '../Image/close.png';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/Theme';
import { useNavigate } from 'react-router-dom';

const SessionTimeOutPopup = ({ open, handleClose }) => {
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

    const handleLogin = () => {
        navigate('/login');
        handleClose();
    }

    const handleRegister = () => {
        navigate('/register');
        handleClose();
    }


    return (
        <>
        <ThemeProvider theme={theme}></ThemeProvider>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="logout-modal-title"
                aria-describedby="logout-modal-description"
            >
                <Box sx={{ ...modalStyle, position: 'relative', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
                        <Typography id="logout-modal-title" variant="h5">
                            Your Session Timed Out!
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <img src={cross} alt="Close" style={{ width: '24px', height: '24px' }} />
                        </IconButton>
                    </Box>
                    <Box sx={{ overflowY: 'auto', padding: '10px' }}>
                        <Typography id="logout-modal-description" variant="body1" component="div" sx={{ marginBottom: '16px' }}>
                            Please login again to continue your exclusive access
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="secondary" onClick={handleLogin} sx={{ marginRight: '8px' }}>
                            Sign In
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleRegister}>
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default SessionTimeOutPopup;
