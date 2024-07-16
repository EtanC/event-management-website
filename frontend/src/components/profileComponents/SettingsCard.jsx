import { Card, CardContent, Typography, Switch, Box } from '@mui/material';
import '../../styles/Profile.css';

const SettingsCard = () => (
    <Card className='flexCard'>
        <CardContent>
            <Typography className='headerFont'>Settings</Typography>
            <Box sx={{ mt: 2 }}>
                <Typography variant="body2">Email Preferences</Typography>
                <Typography variant="body2">Dark Mode</Typography>
                <Switch checked />
            </Box>
        </CardContent>
    </Card>
);

export default SettingsCard;
