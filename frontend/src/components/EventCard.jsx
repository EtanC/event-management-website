/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import defaultImage from '../Image/loading.png';

const EventCard = ({ event, handleCardClick }) => (
    <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card
            sx={{
                width: 345,
                boxShadow: 3,
                borderRadius: 2,
                '&:hover': { cursor: 'pointer', }
            }}
            onClick={() => handleCardClick(event)}
        >
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
                    {event.start_date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {event.location}
                </Typography>
            </CardContent>
        </Card>
    </Grid>
);

export default EventCard;
