import { Card, CardContent, Typography, Switch, Box } from '@mui/material';
import ActionConfirmationPopup from '../ActionConfirmationPopup';
import '../../styles/Profile.css';

const SettingsCard = ({ confirmOpen, notificationsEnabled, handleSwitchChange, handleNotifConfirm, handleNotifCancel }) => {
    return (
        <>
            <ActionConfirmationPopup
                open={confirmOpen}
                onClose={handleNotifCancel}
                onConfirm={handleNotifConfirm}
                title={'Turn off Notifications'}
                content={'Are you sure you want to turn off email notifications? You can turn this back on if you change your mind.'}
                primaryButtonText={'Turn Off'}
            />
            <Card className='flexCard'>
                <CardContent>
                    <Typography className='headerFont'>Settings</Typography>
                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body1">Email Notifications</Typography>
                            <Switch
                                checked={notificationsEnabled}
                                onChange={handleSwitchChange}
                            />
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default SettingsCard;
