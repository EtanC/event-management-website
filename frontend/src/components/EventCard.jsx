import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import defaultImage from '../Image/loading.png';
import { formatDate } from '../helper/helpers'

const EventCard = ({ event, handleCardClick, isMyEventsPage, onEditEvent, onDeleteEvent, onAddEventManger }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const formattedDate = formatDate(event.start_date)

    const handleMenuClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        if (event) {
            event.stopPropagation();
        }
        setAnchorEl(null);
    };

    const handleEdit = (event) => {
        event.stopPropagation();
        handleClose();
        onEditEvent(event);
    };

    const handleAddManager = (event) => {
        event.stopPropagation();
        handleClose();
        onAddEventManger();
    };

    const handleDelete = (event) => {
        event.stopPropagation();
        handleClose();
        onDeleteEvent(event);
    };

    return (
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
                sx={{
                    width: 345,
                    boxShadow: 3,
                    borderRadius: 2,
                    '&:hover': { cursor: 'pointer' },
                    position: 'relative',
                }}
                onClick={() => handleCardClick(event)}
            >
                {isMyEventsPage && (
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleMenuClick}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            zIndex: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
                        }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                )}
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={(event) => event.stopPropagation()}
                >
                    <MenuItem onClick={handleEdit}>Edit Event</MenuItem>
                    <MenuItem onClick={handleAddManager}>Add Event Manager</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete Event</MenuItem>
                </Menu>
                <CardMedia
                    component="div"
                    sx={{
                        position: 'relative',
                        height: 140,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f0f0f0',
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8
                    }}
                >
                    <img
                        src={defaultImage}
                        alt={event.name}
                        style={{
                            maxHeight: '100%',
                            maxWidth: '100%',
                            objectFit: 'contain',
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8
                        }}
                    />
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {event.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formattedDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {event.location}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default EventCard;