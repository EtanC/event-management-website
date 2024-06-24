import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HtmlTagRender from '../components/HtmlTagRender';
import EventDetail from '../components/EventDetail';
import defaultImage from '../Image/eventInfo-background.jpeg';

import {
    Box,
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    IconButton,
} from '@mui/material';

import {
    LocationOn,
    Facebook,
    WhatsApp,
    LinkedIn,
    Twitter,
} from '@mui/icons-material';

import '../styles/EventDetailPage.css'; 

function EventDetailPage() {
const location = useLocation();
const { event } = location.state;

return (
    <>
        <Navbar />
        <Box sx={{ backgroundColor: '#f5f5f5', padding: '20px 0' }}>
            <Container maxWidth="lg">
            <Box
                sx={{
                position: 'relative',
                marginBottom: '20px',
                borderRadius: '8px',
                overflow: 'hidden',
                paddingTop: '56.25%', // apparently this ensures responsiveness
                }}
            >
                <img
                src={defaultImage}
                alt="Event Background"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'flex',
                }}
                />
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-80%, -80%)', zIndex: 2 }}>
                <Typography variant="h4" component="h1" className="event-title" sx={{ fontWeight: 'bold' }}>
                    {event.name}
                </Typography>
                </Box>
                <EventDetail date={event.date} />
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                <Box sx={{ padding: '20px' }}>
                    <HtmlTagRender htmlString={event.details} />
                </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                <Box sx={{ padding: '20px' }}>
                    <Card sx={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="h6" component="h2" gutterBottom>
                        Event location
                        </Typography>
                        <Box display="flex" alignItems="center">
                        <LocationOn sx={{ marginRight: '8px' }} />
                        <Typography variant="body1">{event.location}</Typography>
                        </Box>
                    </CardContent>
                    </Card>
                    <Card sx={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="h6" component="h2" gutterBottom>
                        Share with friends
                        </Typography>
                        <Box display="flex">
                        {[Facebook, WhatsApp, LinkedIn, Twitter].map((Icon, index) => (
                            <IconButton key={index} color="primary">
                            <Icon />
                            </IconButton>
                        ))}
                        </Box>
                    </CardContent>
                    </Card>
                </Box>
                </Grid>
            </Grid>
            </Container>
        </Box>
        </>
    );
}

export default EventDetailPage;
