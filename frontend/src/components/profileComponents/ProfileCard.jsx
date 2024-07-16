import { Card, CardContent, Box, Typography, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import defaultProfilePic from '../../Image/defaultProfile.png';

const ProfileCard = ({ profile, isEditing, newProfile, new_profile_pic, handleChange, handleProfilePicChange }) => (
    <Card sx={styles.flexCard}>
        <CardContent>
            <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <img
                    src={profile.profile_pic ? `data:image/jpeg;base64,${profile.profile_pic}` : defaultProfilePic}
                    alt="Profile"
                    style={{ width: 100, height: 100, borderRadius: '50%' }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    {(new_profile_pic && isEditing) && (
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                            {new_profile_pic.name}
                        </Typography>
                    )}
                    {isEditing && (
                        <IconButton
                            color="primary"
                            aria-label="edit profile picture"
                            component="label"
                            sx={{ bottom: 0, right: 0 }}
                        >
                            <EditIcon />
                            <input
                                type="file"
                                hidden
                                onChange={handleProfilePicChange}
                            />
                        </IconButton>
                    )}
                </Box>
            </Box>
            <Typography variant="h4" sx={{ mb: 2 }}>{profile.full_name}</Typography>
            {isEditing ? (
                <TextField
                    name="description"
                    label="Headline"
                    value={newProfile.description}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{ sx: { borderRadius: '40px', mb: 2 } }}
                />
            ) : (
                <Typography variant="body1">{profile.description}</Typography>
            )}
        </CardContent>
    </Card>
);

const styles = {
    flexCard: {
        marginBottom: '30px',
        borderRadius: '10px',
    }
};

export default ProfileCard;
