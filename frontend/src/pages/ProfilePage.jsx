import React from 'react';

// components
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"

import { Container, Box, Typography, Switch, Button, Card, CardContent, Grid } from '@mui/material';

function ProfilePage() {
    return (
        <>
            <Navbar />
            <Container maxWidth="md" sx={{ marginTop: '20px' }}>
                <Grid container spacing={2} sx={{ marginBottom: '30px' }}>
                    <Grid item xs={6}>
                        <Card sx={styles.flexCard}>
                            <CardContent>
                                <Typography variant="h5">"Live love laugh"</Typography>
                                <Box sx={{ mt: 2, mb: 2 }}>
                                    <img
                                        src="profile-placeholder.png"
                                        alt="Profile"
                                        style={{ width: 60, height: 60, borderRadius: '50%' }}
                                    />
                                </Box>
                                <Typography variant="h6">ETHAN CHEN</Typography>
                                <Typography variant="body1">Aspiring Software Engineer</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={styles.flexCard}>
                            <CardContent>
                                <Typography variant="h6">Account Information</Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body2"><strong>Full Name:</strong> Ethan Chen</Typography>
                                    <Typography variant="body2"><strong>Email Address:</strong> 123@gmail.com</Typography>
                                    <Typography variant="body2"><strong>Job Title:</strong> Unemployment</Typography>
                                    <Typography variant="body2"><strong>Fun Fact:</strong> Live love laugh</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card sx={styles.flexCard}>
                            <CardContent>
                                <Typography variant="h6">Settings</Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body2">Email Preferences</Typography>
                                    <Typography variant="body2">Dark Mode</Typography>
                                    <Switch checked />
                                </Box>
                            </CardContent>
                        </Card>
                        <Card sx={styles.flexCard}>
                            <CardContent>
                                <Typography variant="h6">Password</Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body2">Password</Typography>
                                    <Typography variant="body2">******************</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Box sx={styles.flexbox}>
                    <Button variant="contained" color="success">Edit</Button>
                </Box>
            </Container>

        </>
    );
}

const styles = {
    flexbox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexCard: {
        marginBottom: '20px'
    },
}

export default ProfilePage;
