import { Card, CardContent, Typography, TextField, Box, Button, Tooltip, IconButton, Alert } from '@mui/material';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

const PasswordCard = ({ isEditingPW, password, errorMessage, handlePWChange, handleEditPWClick, updatePassword }) => (
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
                                InputProps={{ sx: { borderRadius: '40px', mb: 2 } }}
                            />
                            <TextField
                                name="new_pw"
                                label="New Password"
                                type="password"
                                value={password.new_pw}
                                onChange={handlePWChange}
                                fullWidth
                                required
                                InputProps={{ sx: { borderRadius: '40px', mb: 2 } }}
                            />
                            <TextField
                                name="confirm_new_pw"
                                label="Confirm New Password"
                                type="password"
                                value={password.confirm_new_pw}
                                onChange={handlePWChange}
                                fullWidth
                                required
                                InputProps={{ sx: { borderRadius: '40px', mb: 2 } }}
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
    },
    flexbox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
};

export default PasswordCard;
