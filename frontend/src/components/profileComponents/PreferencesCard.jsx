import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import '../../styles/Profile.css';
import PreferencesSelect from '../calendarSideBarComponents/PreferencesSelectBox';

const PreferencesCard = ({ profile, updatedPreferences, isEditingPref, handleEditPreferencesClick, setUpdatedPreferences, updatePreferences }) => {
    const [initialPreferences, setInitialPreferences] = useState([]);

    useEffect(() => {
        if (isEditingPref) {
            setInitialPreferences(updatedPreferences);
        }
    }, [isEditingPref]);

    const cancelEditPreferences = () => {
        setUpdatedPreferences(initialPreferences);
        handleEditPreferencesClick();
    };

    return (
        <Card className='flexCard'>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <Typography className='headerFont'>Preferences</Typography>
                </Box>
                <Box className='flexbox'>
                    {isEditingPref ? (
                        <>
                            <PreferencesSelect
                                value={updatedPreferences}
                                onChange={setUpdatedPreferences}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '20px' }}>
                                <Button
                                    variant="outlined" color="primary"
                                    className='button-common'
                                    onClick={cancelEditPreferences}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained" color="primary"
                                    className='button-common'
                                    onClick={updatePreferences}
                                >
                                    Update
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box className='bubbles-container'>
                                {profile.preferences && profile.preferences.map((preference, index) => (
                                    <span key={index} className='preference-bubble'>{preference}</span>
                                ))}
                            </Box>
                            <Button
                                variant="contained" color="primary"
                                className='button-common button-edit button-responsive'
                                onClick={handleEditPreferencesClick}
                            >
                                Update Preferences
                            </Button>
                        </>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default PreferencesCard;
