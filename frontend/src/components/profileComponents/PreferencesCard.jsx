import { Card, CardContent, Typography, TextField, Box, Button, Tooltip, Alert } from '@mui/material';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import '../../styles/Profile.css';

const PreferencesCard = ({ isEditingPref, handleEditPreferencesClick, errorMessage }) => (
    <Card className='flexCard'>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Typography className='headerFont'>Preferences</Typography>
            </Box>
            <Box className='flexbox'>
                {isEditingPref ? (
                    <>
                        <Typography>hi</Typography>
                        {errorMessage && <Alert severity="error" sx={{ marginBottom: '20px' }}>{errorMessage}</Alert>}
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '20px' }}>
                            <Button
                                variant="outlined" color="primary"
                                className='button-common'
                                onClick={handleEditPreferencesClick}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained" color="primary"
                                className='button-common'
                            // onClick={updatePassword}
                            >
                                Save Password
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Button
                            variant="contained" color="primary"
                            className='button-common button-edit'
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

export default PreferencesCard;
