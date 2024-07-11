import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { Container, Box, Typography, Switch, Button, Card, CardContent, Grid, TextField, Tooltip, IconButton, Alert } from '@mui/material';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import EditIcon from '@mui/icons-material/Edit';
import defaultProfilePic from '../Image/defaultProfile.png';
import { fetchProfileData, updateProfileDetails, updateProfilePassword } from '../helper/handleProfileData';
import theme from '../styles/Theme';
import { ThemeProvider } from '@mui/material/styles';

function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPW, setIsEditingPW] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [profile, setProfile] = useState({
        description: "",
        full_name: "",
        email: "",
        job_title: "",
        fun_fact: "",
        pw: "",
        profile_pic: null,
    });
    const [new_profile_pic, setNewProfilePic] = useState(null)

    useEffect(() => {
        fetchProfileData(setProfile);
    }, []);

    const [newProfile, setNewProfile] = useState({
        description: '',
        full_name: '',
        job_title: '',
        fun_fact: '',
    });

    const [password, setPassword] = useState({
        old_pw: '',
        new_pw: '',
        confirm_new_pw: '',
    });

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleEditPWClick = () => {
        setIsEditingPW(!isEditingPW);
        setErrorMessage('');
        setPassword({
            old_pw: '',
            new_pw: '',
            confirm_new_pw: '',
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewProfile({
            ...newProfile,
            [name]: value
        });
    };

    const handlePWChange = (event) => {
        const { name, value } = event.target;
        setPassword({
            ...password,
            [name]: value
        });
    };

    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        setNewProfilePic(file)
    };

    const updateProfile = async () => {
        const updatedProfile = {
            ...profile,
            description: newProfile.description !== "" ? newProfile.description : profile.description,
            full_name: newProfile.full_name !== "" ? newProfile.full_name : profile.full_name,
            job_title: newProfile.job_title !== "" ? newProfile.job_title : profile.job_title,
            fun_fact: newProfile.fun_fact !== "" ? newProfile.fun_fact : profile.fun_fact,
            profile_pic: new_profile_pic,
            username: profile.username,
        };
        try {
            const result = await updateProfileDetails(updatedProfile);
            if (result === 200) {
                alert("Profile successfully updated.");
                await fetchProfileData(setProfile);
            }
            setNewProfile({
                description: "",
                full_name: "",
                job_title: "",
                fun_fact: "",
            });
            setNewProfilePic(null)
            setIsEditing(false);

        } catch (err) {
            console.error(`Failed to update profile: ${err.message}`);
        }
    };

    const updatePassword = async () => {
        try {
            const result = await updateProfilePassword(password, setErrorMessage);
            if (result === 200) {
                alert("Reset Password Successfully");
                setIsEditingPW(false);
            }
        } catch (err) {
            console.error(`Failed to change password: ${err.message}`);
        }
    }

    return (
        <>
            <ThemeProvider theme={theme}></ThemeProvider>
            <Navbar />
            <Box sx={{ backgroundColor: '#f5f5f5', padding: '50px 0', minHeight: '90vh' }}>
                <Container maxWidth="md" sx={{ mt: 2 }} >
                    <Grid container spacing={4} sx={{ mb: 5 }}>
                        <Grid item xs={6}>
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
                                            InputProps={{ sx: { borderRadius: '40px', mb: 2 }, }}
                                        />
                                    ) : (
                                        <Typography variant="body1">{profile.description}</Typography>
                                    )}
                                </CardContent>
                            </Card>
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
                                                    InputProps={{ sx: { borderRadius: '40px', mb: 2 }, }}
                                                />
                                                <TextField
                                                    name="job_title"
                                                    label="Job Title"
                                                    value={newProfile.job_title}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    InputProps={{ sx: { borderRadius: '40px', mb: 2 }, }}
                                                />
                                                <TextField
                                                    name="fun_fact"
                                                    label="Fun Fact"
                                                    value={newProfile.fun_fact}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    InputProps={{ sx: { borderRadius: '40px', mb: 2 }, }}
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
                        </Grid>
                        <Grid item xs={6}>
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
                            <Card sx={styles.flexCard}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography sx={styles.headerFont}>Password</Typography>
                                        {isEditingPW && (
                                            <Box sx={{ mb: '20px' }}>
                                                <Tooltip title="A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.">
                                                    <IconButton>
                                                        <InfoOutlined />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        )}
                                    </Box>
                                    <Box sx={styles.flexbox}>
                                        <Box>
                                            {isEditingPW ? (
                                                <>
                                                    <TextField
                                                        name="old_pw"
                                                        label="Old Password"
                                                        type="password"
                                                        value={password.old_pw}
                                                        onChange={handlePWChange}
                                                        fullWidth
                                                        required
                                                        InputProps={{ sx: { borderRadius: '40px', mb: 2 }, }}
                                                    />
                                                    <TextField
                                                        name="new_pw"
                                                        label="New Password"
                                                        type="password"
                                                        value={password.new_pw}
                                                        onChange={handlePWChange}
                                                        fullWidth
                                                        required
                                                        InputProps={{ sx: { borderRadius: '40px', mb: 2 }, }}
                                                    />
                                                    <TextField
                                                        name="confirm_new_pw"
                                                        label="Confirm New Password"
                                                        type="password"
                                                        value={password.confirm_new_pw}
                                                        onChange={handlePWChange}
                                                        fullWidth
                                                        required
                                                        InputProps={{ sx: { borderRadius: '40px', mb: 2 }, }}
                                                    />
                                                    {errorMessage && <Alert severity="error" sx={{ marginBottom: '20px' }}>{errorMessage}</Alert>}
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '20px' }}>
                                                        <Button
                                                            variant="outlined" color="primary"
                                                            sx={{ width: '150px', borderRadius: '20px', textTransform: 'none', fontWeight: 'bold' }}
                                                            onClick={handleEditPWClick}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            variant="contained" color="primary"
                                                            sx={{ width: '150px', borderRadius: '20px', textTransform: 'none', fontWeight: 'bold' }}
                                                            onClick={updatePassword}
                                                        >
                                                            Save Password
                                                        </Button>
                                                    </Box>
                                                </>
                                            ) : (
                                                <>
                                                    <Button
                                                        variant="contained" color="primary"
                                                        sx={{ width: '300px', borderRadius: '20px', textTransform: 'none', fontWeight: 'bold' }}
                                                        onClick={handleEditPWClick}
                                                    >
                                                        Change Password
                                                    </Button>
                                                </>
                                            )}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Box sx={styles.flexbox}>
                        {!isEditing ? (
                            <Button
                                variant="contained" color="primary"
                                sx={{ width: '300px', borderRadius: '20px', textTransform: 'none', fontWeight: 'bold' }}
                                onClick={handleEditClick}
                            >
                                Edit
                            </Button>
                        ) : (
                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '20px' }}>
                                    <Button
                                        variant="outlined" color="primary"
                                        sx={{ width: '150px', borderRadius: '20px', textTransform: 'none', fontWeight: 'bold' }}
                                        onClick={handleEditClick}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained" color="primary"
                                        sx={{ width: '150px', borderRadius: '20px', textTransform: 'none', fontWeight: 'bold' }}
                                        onClick={updateProfile}
                                    >
                                        Save
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Box>
                </Container >
            </Box>
        </>
    );
}

const styles = {
    flexbox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    flexCard: {
        marginBottom: '30px',
        borderRadius: '10px',
    },
    headerFont: {
        fontWeight: 'bold',
        fontSize: '18px',
        marginBottom: '20px',
    }
}

export default ProfilePage;
