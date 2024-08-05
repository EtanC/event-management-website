import React, { useState } from 'react';
import { Typography, Box, Container, ToggleButton, ToggleButtonGroup } from '@mui/material';
import AdminEventsPage from '../components/adminComponents/AdminEventsPage';
import AdminUsersPage from '../components/adminComponents/AdminUsersPage';

const AdminPage = () => {
    const [view, setView] = useState('users'); // Default view set to 'users'

    const handleViewChange = (event, newView) => {
        if (newView !== null) {
            setView(newView);
        }
    };

    return (
        <>
            <Box sx={{ minHeight: '100vh' }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" sx={{ marginBottom: '20px' }}>Admin</Typography>
                    <ToggleButtonGroup
                        value={view}
                        exclusive
                        onChange={handleViewChange}
                        sx={{ width: '100%', marginBottom: '20px' }}
                    >
                        <ToggleButton value="users" sx={{ flex: 1 }}>
                            Manage Users
                        </ToggleButton>
                        <ToggleButton value="events" sx={{ flex: 1 }}>
                            Manage Events
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {view === 'users' ? <AdminUsersPage /> : <AdminEventsPage />}
                </Container>
            </Box>
        </>
    );
};

export default AdminPage;
