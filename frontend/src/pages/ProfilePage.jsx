import { useState, useEffect } from 'react';
import { Container, Box, Grid, Snackbar, ThemeProvider, Alert } from '@mui/material';
import { fetchProfileData, updateProfileDetails, updateProfilePassword, updateProfilePreferences, toggleNotifications } from '../helper/handleProfileData';
import theme from '../styles/Theme';
import ProfileCard from '../components/profileComponents/ProfileCard';
import AccountInfoCard from '../components/profileComponents/AccountInfoCard';
import SettingsCard from '../components/profileComponents/SettingsCard';
import PreferencesCard from '../components/profileComponents/PreferencesCard';
import PasswordCard from '../components/profileComponents/PasswordCard';
import EditButtons from '../components/profileComponents/EditButtons';

function ProfilePage() {
    // useStates
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPW, setIsEditingPW] = useState(false);
    const [isEditingPref, setIsEditingPref] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [profile, setProfile] = useState({
        description: "",
        full_name: "",
        email: "",
        job_title: "",
        fun_fact: "",
        pw: "",
        profile_pic: null,
        receive_notifications: null,
        preferences: [],
    });
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
    const [updatedPreferences, setUpdatedPreferences] = useState([])
    const [new_profile_pic, setNewProfilePic] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // for settings card
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    // get profile data
    useEffect(() => {
        fetchProfileData(setProfile);
    }, []);

    // get default state for email notifications
    useEffect(() => {
        setNotificationsEnabled(profile.receive_notifications)
        setUpdatedPreferences(profile.preferences)
    }, [profile])

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

    const handleEditPreferencesClick = () => {
        setIsEditingPref(!isEditingPref);
        if (isEditingPref) setUpdatedPreferences(profile.preferences);
    }

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
        setNewProfilePic(file);
    };

    const updateProfile = async () => {
        const updatedProfile = {
            ...profile,
            description: newProfile.description !== "" ? newProfile.description : profile.description,
            full_name: newProfile.full_name !== "" ? newProfile.full_name : profile.full_name,
            job_title: newProfile.job_title !== "" ? newProfile.job_title : profile.job_title,
            fun_fact: newProfile.fun_fact !== "" ? newProfile.fun_fact : profile.fun_fact,
            profile_pic: new_profile_pic,

        };
        try {
            const result = await updateProfileDetails(updatedProfile);
            if (result === 200) {
                showSnackbar('Profile successfully updated.');
                await fetchProfileData(setProfile);
            }
            setNewProfile({
                description: "",
                full_name: "",
                job_title: "",
                fun_fact: "",
            });
            setNewProfilePic(null);
            setIsEditing(false);
        } catch (err) {
            console.error(`Failed to update profile: ${err.message}`);
        }
    };

    const updatePassword = async () => {
        try {
            const result = await updateProfilePassword(password, setErrorMessage);
            if (result === 200) {
                showSnackbar('Password reset successfully.');
                setIsEditingPW(false);
            }
        } catch (err) {
            console.error(`Failed to change password: ${err.message}`);
        }
    };

    const updatePreferences = async () => {
        try {
            const result = await updateProfilePreferences(updatedPreferences);
            if (result === 200) {
                showSnackbar('Preferences successfully updated.');
                await fetchProfileData(setProfile);
            }
            setIsEditingPref(false);
        } catch (err) {
            console.error(`Failed to update preferences: ${err.message}`);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    // notification functions
    const handleSwitchChange = () => {
        if (notificationsEnabled) {
            setConfirmOpen(true);
        } else handleNotifConfirm();
    };

    const handleNotifConfirm = async () => {
        try {
            await toggleNotifications();
            setNotificationsEnabled(!notificationsEnabled);
            setConfirmOpen(false);
        } catch (error) {
            console.error('Failed to toggle notifications');
        }
    };

    const handleNotifCancel = () => {
        setConfirmOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: '90vh', backgroundColor: '#f5f5f5', paddingBottom: '100px' }}>
                <Container maxWidth="md" sx={{ mt: 2 }}>
                    <Grid container spacing={{ xs: 0, sm: 4 }} sx={{ mb: 5, display: 'flex', flexDirection: {
                        xs: 'column',
                        sm: 'row'
                    }}}>
                        <Grid item xs={12} sm={6}>
                            <ProfileCard
                                profile={profile}
                                isEditing={isEditing}
                                newProfile={newProfile}
                                new_profile_pic={new_profile_pic}
                                handleChange={handleChange}
                                handleProfilePicChange={handleProfilePicChange}
                            />
                            <AccountInfoCard
                                profile={profile}
                                isEditing={isEditing}
                                newProfile={newProfile}
                                handleChange={handleChange}
                            />
                            <EditButtons
                                isEditing={isEditing}
                                handleEditClick={handleEditClick}
                                updateProfile={updateProfile}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <SettingsCard
                                confirmOpen={confirmOpen}
                                notificationsEnabled={notificationsEnabled}
                                handleSwitchChange={handleSwitchChange}
                                handleNotifConfirm={handleNotifConfirm}
                                handleNotifCancel={handleNotifCancel}
                            />
                            <PreferencesCard
                                profile={profile}
                                isEditingPref={isEditingPref}
                                handleEditPreferencesClick={handleEditPreferencesClick}
                                updatedPreferences={updatedPreferences}
                                setUpdatedPreferences={setUpdatedPreferences}
                                updatePreferences={updatePreferences}
                            />
                            <PasswordCard
                                isEditingPW={isEditingPW}
                                password={password}
                                errorMessage={errorMessage}
                                handlePWChange={handlePWChange}
                                handleEditPWClick={handleEditPWClick}
                                updatePassword={updatePassword}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
            >
                <Alert onClose={handleSnackbarClose} severity={'success'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}

export default ProfilePage;
