import { Card, CardContent, Typography, Switch, Box } from '@mui/material';

const SettingsCard = () => (
    <Card sx={styles.flexCard}>
        <CardContent>
            <Typography sx={styles.headerFont}>Settings</Typography>
            <Box sx={{ mt: 2 }}>
                <Typography variant="body2">Email Preferences</Typography>
                <Typography variant="body2">Dark Mode</Typography>
                <Switch checked />
            </Box>
        </CardContent>
    </Card>
);

const styles = {
    flexCard: {
        marginBottom: '30px',
        borderRadius: '10px',
    },
    headerFont: {
        fontWeight: 'bold',
        fontSize: '18px',
        marginBottom: '20px',
    }
};

export default SettingsCard;
