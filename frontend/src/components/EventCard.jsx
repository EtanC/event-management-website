import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import defaultImage from '../Image/loading.png';
import { formatDate } from '../helper/helpers';

const EventCard = ({
    event,
    handleCardClick,
    isCreatedEvent,
    isManagedEvent,
    onEditEvent,
    onDeleteEvent,
    onAddEventManager
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const formattedDate = formatDate(event.start_date);

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
        onAddEventManager(event);
    };

    const handleDelete = (event) => {
        event.stopPropagation();
        handleClose();
        onDeleteEvent(event);
    };

    const menuItems = [
        <MenuItem key="edit" onClick={handleEdit}>Edit Event</MenuItem>,
        ...(isCreatedEvent ? [
            <MenuItem key="addManager" onClick={handleAddManager}>Add Event Manager</MenuItem>,
            <MenuItem key="delete" onClick={handleDelete}>Delete Event</MenuItem>
        ] : [])
    ];

    return (
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
                sx={{
                    width: 345,
                    height: 300,
                    boxShadow: 'none',
                    borderRadius: 2,
                    backgroundColor: '#f5f5f5',
                    '&:hover': { cursor: 'pointer', boxShadow: 3 },
                    position: 'relative',
                }}
                onClick={() => handleCardClick(event)}
            >
                {(isCreatedEvent || isManagedEvent) && (
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
                    {menuItems}
                </Menu>
                <CardMedia
                    component="div"
                    sx={{
                        position: 'relative',
                        height: 140,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8, 
                        margin: '10px',
                    }}
                >
                    <img
                        src={`/static/random_background/${event.image}.jpg`}
                        alt={event.name}
                        style={{
                            maxHeight: '100%',
                            maxWidth: '100%',
                            objectFit: 'contain',
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8, 
                            padding: '10px',
                        }}
                    />
                </CardMedia>
                <CardContent>
                <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="div"
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        '&:hover': {
                            whiteSpace: 'normal',
                            animation: 'marquee 5s linear infinite'
                        },
                        '@keyframes marquee': {
                            '0%': { transform: 'translateY(0)' },
                            '100%': { transform: 'translateY(-100%)' }
                        }
                    }}
                >
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