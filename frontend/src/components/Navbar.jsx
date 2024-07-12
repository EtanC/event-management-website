import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../helper/handleAuth';
import logo from '../Image/CompanyLogo.png';
import defaultProfilePic from '../Image/defaultProfile.png';
import { fetchProfileData } from '../helper/handleProfileData';

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Button,
    MenuItem,
    Menu,
} from '@mui/material';

function NavBar() {
    const navigate = useNavigate();
    // currently, if a token is detected in localstorage then system is considered "logged in"
    const [auth, setAuth] = React.useState(!!localStorage.getItem('token'));
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [profileData, setProfileData] = React.useState(null);

    React.useEffect(() => {
        fetchProfileData(setProfileData);
    }, []);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCalendar = () => {
        navigate('/MyCalendar')
    }

    const handleSignIn = () => {
        navigate('/login');
    };

    const handleSignUp = () => {
        navigate('/register');
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    const handleAdmin = () => {
        navigate('/admin');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ padding: "25px 10px 25px", backgroundColor: 'white', borderBottom: '1px solid #e0e0e0' }}>
                <Toolbar>
                    <img
                        src={logo}
                        alt="Company Logo"
                        style={{ cursor: 'pointer', height: '50px' }}
                        onClick={handleLogoClick}
                    />
                    <Box sx={{ flexGrow: 1 }} />
                    {auth ? (
                        <div>
                            {auth && profileData ? (
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
                                <MenuItem onClick={() => handleLogout(navigate, setAuth)}>Log Out</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <div>
                            <Button sx={{ marginRight: 2 }} onClick={handleSignIn}>Sign In</Button>
                            <Button variant="contained" color="primary" onClick={handleSignUp}>Sign Up</Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;
