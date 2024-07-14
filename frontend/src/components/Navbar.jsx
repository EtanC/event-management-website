import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Image/CompanyLogo.png';
import defaultProfilePic from '../Image/defaultProfile.png';
import { useProfile } from './ProfileProvider';
import { handleLogout } from '../helper/handleAuth';

import { AppBar, Box, Toolbar, IconButton, Typography, Button, MenuItem, Menu } from '@mui/material';

function NavBar() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const { profileData, loading, isAuthenticated, setProfileData } = useProfile();

    const handleMenu = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => {
        setAnchorEl(null);
        window.scrollTo(0, 0);
    };

    const handleCalendar = () => {
        navigate('/my-calendar');
        handleClose();
    };

    const handleSignIn = () => {
        navigate('/login');
        handleClose();
    };

    const handleSignUp = () => {
        navigate('/register');
        handleClose();
    };

    const handleLogoClick = () => {
        navigate('/');
        handleClose();
    };

    const handleProfile = () => {
        navigate('/profile');
        handleClose();
    };

    const handleAdmin = () => {
        navigate('/admin');
        handleClose();
    };

    const logOutButton = () => {
        setProfileData(null); // Clear profile data
        handleLogout(navigate);
        handleClose();
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" elevation={0} sx={{ padding: "25px 10px 25px", backgroundColor: 'white', borderBottom: '1px solid #e0e0e0' }}>
                    <Toolbar>
                        <img
                            src={logo}
                            alt="Company Logo"
                            style={{ cursor: 'pointer', height: '50px' }}
                            onClick={handleLogoClick}
                        />
                        <Box sx={{ flexGrow: 1 }} />
                        {isAuthenticated && !loading ? (
                            profileData ? (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography sx={{ mr: 2, color: 'black' }}>
                                        {profileData.full_name || ''}
                                    </Typography>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="primary"
                                        sx={{ padding: 0 }}
                                    >
                                        <img
                                            src={profileData.profile_pic
                                                ? `data:image/jpeg;base64,${profileData.profile_pic}`
                                                : defaultProfilePic}
                                            alt="Profile"
                                            style={{ cursor: 'pointer', height: '50px', width: '50px', borderRadius: '50%' }}
                                        />
                                    </IconButton>
                                </div>
                            ) : (
                                <div>
                                    <Button sx={{ marginRight: 2 }} onClick={handleSignIn}>Sign In</Button>
                                    <Button variant="contained" color="primary" onClick={handleSignUp}>Sign Up</Button>
                                </div>
                            )
                        ) : (
                            <div>
                                <Button sx={{ marginRight: 2 }} onClick={handleSignIn}>Sign In</Button>
                                <Button variant="contained" color="primary" onClick={handleSignUp}>Sign Up</Button>
                            </div>
                        )}
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            sx={{ mt: 1.5 }}
                        >
                            <MenuItem onClick={handleProfile}>Profile</MenuItem>
                            <MenuItem onClick={handleCalendar}>Calendar</MenuItem>
                            <MenuItem onClick={handleAdmin}>Admin</MenuItem>
                            <MenuItem onClick={logOutButton}>Log Out</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ paddingTop: '125px', backgroundColor: '#f5f5f5' }} />
        </>
    );
}

export default NavBar;
