// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { CalendarToday } from '@mui/icons-material';
import handleRegisterEvent from '../helper/handleRegisterEvent';

// eslint-disable-next-line react/prop-types
const EventDetail = ({ event }) => {
    return (
        <Box className="date-time-box" sx={{ position: 'absolute', top: '30%', left: '70%', transform: 'translate(-20%, -0%)', zIndex: 2 }}>
            <Card sx={{ padding: '20px', width: '100%' }}>
                <CardContent>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Date & time
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <CalendarToday sx={{ marginRight: '8px' }} />
                        <Typography variant="body1">{event.start_date}</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ textTransform: 'none', marginTop: '20px' }}
                        onClick={() => handleRegisterEvent(event._id)}
                    >
                        Register
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{ textTransform: 'none', marginTop: '10px' }}
                        href={event.conference_link}
                    >
                        Conference Website
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default EventDetail;
