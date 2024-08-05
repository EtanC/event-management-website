import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ActionConfirmationPopup = ({ open, onClose, onConfirm, title, content, primaryButtonText }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    padding: '20px',
                },
            }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" sx={styles.button} onClick={onClose}>Cancel</Button>
                <Button variant="contained" color="primary" sx={styles.button} onClick={onConfirm}>{primaryButtonText}</Button>
            </DialogActions>
        </Dialog>
    );
}

const styles = {
    button: {
        borderRadius: '25px',
        textTransform: 'none'
    },
};

export default ActionConfirmationPopup;