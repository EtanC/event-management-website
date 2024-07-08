import React from 'react';
import { Typography, Box, Container, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <Box sx={{ backgroundColor: '#f5f5f5', padding: '40px 0', minHeight: '100vh' }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" sx={{ marginBottom: '40px' }}>Admin</Typography>
                    <Typography variant="b2" sx={{ marginBottom: '40px' }}>You're the goat</Typography>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ textTransform: 'none', padding: '20px 40px', fontSize: '16px' }}
                                onClick={() => navigate('/admin/users')}
                            >
                                Manage Users
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ textTransform: 'none', padding: '20px 40px', fontSize: '16px' }}
                                onClick={() => navigate('/admin/events')}
                            >
                                Manage Events
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default AdminPage;
