import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../helper/handleAuth';
import logo from '../Image/CompanyLogo.png';
import profile from '../Image/defaultProfile.png';

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Button,
    MenuItem,
    Menu,
} from '@mui/material';

function NavBar() {
    const navigate = useNavigate();
    // currently, if a token is detected in localstorage then system is considered "logged in"
    const [auth, setAuth] = React.useState(!!localStorage.getItem('token'));
    const [anchorEl, setAnchorEl] = React.useState(null);

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
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="primary"
                                sx={{ padding: 0 }}
                            >
                                <img
                                    src={profile}
                                    alt="Profile"
                                    style={{ cursor: 'pointer', height: '40px', width: '40px', borderRadius: '50%' }}
                                />
                            </IconButton>
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
                                <MenuItem onClick={() => handleLogout(navigate, setAuth)}>Log Out</MenuItem>
                                <MenuItem onClick={handleAdmin}>Admin</MenuItem>
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
