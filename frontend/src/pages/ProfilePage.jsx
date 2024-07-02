import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import { Container, Box, Typography, Switch, Button, Card, CardContent, Grid, TextField, Tooltip, IconButton } from '@mui/material';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import EditIcon from '@mui/icons-material/Edit';
import profilePic from '../Image/defaultProfile.png';

function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPW, setIsEditingPW] = useState(false);
    const [profile, setProfile] = useState({
        description: "Aspiring Software Developer",
        fullName: "Ethan Chen",
        email: "123@gmail.com",
        jobTitle: "Unemployment",
        funFact: "Live love laugh",
        pw: "lmfao",
    });

    const [newProfile, setNewProfile] = useState({
        description: '',
        fullName: '',
        email: '',
        jobTitle: '',
        funFact: '',
    });

    const [password, setPassword] = useState({
        oldpw: '',
        newpw: '',
        confirmNewpw: '',
    });

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleEditPWClick = () => {
        setIsEditingPW(!isEditingPW);
    };

    const handleChangePassword = () => {
        if (isEditingPW) {
            if (password.oldpw === profile.pw) {
                if (password.newpw !== password.confirmNewpw) {
                    alert("Passwords do not match. Please try again.");
                    return;
                }
                setProfile({
                    ...profile,
                    pw: password.newpw
                });
                alert("Password changed successfully!");
                setIsEditingPW(false);
                setPassword({
                    oldpw: '',
                    newpw: '',
                    confirmNewpw: '',
                });
                setIsEditingPW(!isEditingPW);
            } else {
                alert("Old password is incorrect. Please try again.");
            }
        } else {
            setIsEditingPW(!isEditingPW);
        }
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
        const { name, value } = event.target;
        set
    }

    const updateProfile = () => {
        const updatedProfile = {
            ...profile,
            description: newProfile.description !== "" ? newProfile.description : profile.description,
            fullName: newProfile.fullName !== "" ? newProfile.fullName : profile.fullName,
            email: newProfile.email !== "" ? newProfile.email : profile.email,
            jobTitle: newProfile.jobTitle !== "" ? newProfile.jobTitle : profile.jobTitle,
            funFact: newProfile.funFact !== "" ? newProfile.funFact : profile.funFact,
        };

        setProfile(updatedProfile);

        setNewProfile({
            description: "",
            fullName: "",
            email: "",
            jobTitle: "",
            funFact: "",
        });
        setIsEditing(!isEditing);
        alert("Profile successfully updated.");
    };

    return (
        <>
            <Navbar />
            <Box sx={{ backgroundColor: '#f5f5f5', padding: '50px 0', minHeight: '90vh' }}>
                <Container maxWidth="md" sx={{ mt: 2 }} >
                    <Grid container spacing={4} sx={{ mb: 5 }}>
                        <Grid item xs={6}>
                            <Card sx={styles.flexCard}>
                                <CardContent>
                                    <Box sx={{ mt: 2, mb: 2, position: 'relative' }}>
                                        <img
                                            src={profilePic}
                                            alt="Profile"
                                            style={{ width: 100, height: 100, borderRadius: '50%' }}
                                        />
                                        {isEditing && (
                                            <IconButton
                                                color="primary"
                                                aria-label="edit profile picture"
                                                component="label"
                                                sx={{ position: 'absolute', bottom: 0, right: 0 }}
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
                                    <Typography variant="h4" sx={{ mb: 2 }}>{profile.fullName}</Typography>
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
                                                    name="fullName"
                                                    label="Full Name"
                                                    value={newProfile.fullName}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    InputProps={{ sx: { borderRadius: '40px', mb: 2 }, }}
                                                />
                                                <TextField
                                                    name="email"
                                                    label="Email Address"
                                                    value={newProfile.email}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    InputProps={{ sx: { borderRadius: '40px', mb: 2 }, }}
                                                />
                                                <TextField
                                                    name="jobTitle"
                                                    label="Job Title"
                                                    value={newProfile.jobTitle}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    InputProps={{ sx: { borderRadius: '40px', mb: 2 }, }}
                                                />
                                                <TextField
                                                    name="funFact"
                                                    label="Fun Fact"
                                                    value={newProfile.funFact}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    InputProps={{ sx: { borderRadius: '40px', mb: 2 }, }}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <Typography variant="body1" sx={{ mb: 2 }}><strong>Full Name:</strong> {profile.fullName}</Typography>
                                                <Typography variant="body1" sx={{ mb: 2 }}><strong>Email Address:</strong> {profile.email}</Typography>
                                                <Typography variant="body1" sx={{ mb: 2 }}><strong>Job Title:</strong> {profile.jobTitle}</Typography>
                                                <Typography variant="body1"><strong>Fun Fact:</strong> {profile.funFact}</Typography>
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
                                                        name="oldpw"
                                                        label="Old Password"
                                                        value={password.oldpw}
                                                        onChange={handlePWChange}
                                                        fullWidth
                                                        required
                                                        InputProps={{ sx: { borderRadius: '40px', mb: 2 }, }}
                                                    />
                                                    <TextField
                                                        name="newpw"
                                                        label="New Password"
                                                        value={password.newpw}
                                                        onChange={handlePWChange}
                                                        fullWidth
                                                        required
                                                        InputProps={{ sx: { borderRadius: '40px', mb: 2 }, }}
                                                    />
                                                    <TextField
                                                        name="confirmNewpw"
                                                        label="Confirm New Password"
                                                        value={password.confirmNewpw}
                                                        onChange={handlePWChange}
                                                        fullWidth
                                                        required
                                                        InputProps={{ sx: { borderRadius: '40px', mb: 2 }, }}
                                                    />
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
                                                            onClick={handleChangePassword}
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
