import { Card, CardContent, Typography, TextField, Box, Button, Tooltip, Alert } from '@mui/material';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import '../../styles/Profile.css';

const PasswordCard = ({ isEditingPW, password, errorMessage, handlePWChange, handleEditPWClick, updatePassword }) => (
    <Card className='flexCard'>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Typography className='headerFont'>Password</Typography>
                {isEditingPW && (
                    <Box>
                        <Tooltip title="A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.">
                            <InfoOutlined />
                        </Tooltip>
                    </Box>
                )}
            </Box>
            <Box className='flexbox'>
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
                                className='button-common'
                                onClick={handleEditPWClick}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained" color="primary"
                                className='button-common'
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
                            className='button-common button-edit'
                            onClick={handleEditPWClick}
                        >
                            Change Password
                        </Button>
                    </>
                )}
            </Box>
        </CardContent>
    </Card>
);

export default PasswordCard;
