import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { CalendarToday, Edit } from '@mui/icons-material';
import handleRegisterEvent from '../helper/handleRegisterEvent';
import { formatDate, checkUserIsEventOwner, getUserId } from '../helper/helpers'
import EventModal from '../components/EventModal';

const EventDetail = ({ event, onEditClick, setEvent}) => {
    const [userCanEdit, setUserCanEdit] = useState(false);
    const formattedDate = formatDate(event.start_date);
    const [openEditEvent, setOpenEditEvent] = useState(false);

    useEffect(() => {
        const checkUserEditPermission = () => {
            const userId = getUserId();
            const isOwner = event.creator && userId;
            const isManager = event.authorized_users && event.authorized_users.includes(userId);
            setUserCanEdit(isOwner || isManager);
        };

        checkUserEditPermission();
    }, [event]);

    const handleEditClick = () => {
        setOpenEditEvent(true);
    };

    const handleEditClose = () => {
        setOpenEditEvent(false);
    };

    return (
        <>
            <EventModal open={openEditEvent} handleClose={handleEditClose} headerText={'Edit Event'} event={event} setEvent={setEvent}/>
            <Box className="date-time-box" sx={{ position: 'absolute', top: '30%', left: '70%', transform: 'translate(-20%, -0%)', zIndex: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%' }}>
                    {userCanEdit && (
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<Edit />}
                            onClick={handleEditClick}
                            sx={{
                                marginBottom: 2,
                                borderRadius: '25px',
                                textTransform: 'none'
                            }}
                        >
                            Edit Event
                        </Button>
                    )}
                </Box>
                <Card sx={{ padding: '20px', width: '100%' }}>
                    <CardContent>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Date & time
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <CalendarToday sx={{ marginRight: '8px' }} />
                            <Typography variant="body1">{formattedDate}</Typography>
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
                        >
                            Program promoter
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default EventDetail;