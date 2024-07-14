import { Card, CardContent, Typography, TextField, Box } from '@mui/material';

const AccountInfoCard = ({ profile, isEditing, newProfile, handleChange }) => (
    <Card sx={styles.flexCard}>
        <CardContent>
            <Typography sx={styles.headerFont}>Account Information</Typography>
            <Box sx={{ mt: 2 }}>
                {isEditing ? (
                    <>
                        <TextField
                            name="full_name"
                            label="Full Name"
                            value={newProfile.full_name}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{ sx: { borderRadius: '40px', mb: 2 } }}
                        />
                        <TextField
                            name="job_title"
                            label="Job Title"
                            value={newProfile.job_title}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{ sx: { borderRadius: '40px', mb: 2 } }}
                        />
                        <TextField
                            name="fun_fact"
                            label="Fun Fact"
                            value={newProfile.fun_fact}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{ sx: { borderRadius: '40px', mb: 2 } }}
                        />
                    </>
                ) : (
                    <>
                        <Typography variant="body1" sx={{ mb: 2 }}><strong>Full Name:</strong> {profile.full_name}</Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}><strong>Email Address:</strong> {profile.email}</Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}><strong>Job Title:</strong> {profile.job_title}</Typography>
                        <Typography variant="body1"><strong>Fun Fact:</strong> {profile.fun_fact}</Typography>
                    </>
                )}
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

export default AccountInfoCard;
