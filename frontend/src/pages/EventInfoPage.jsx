import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EventDetailRender from '../components/EventDetailRender';
import defaultImage from './eventInfo-background.jpeg';

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';

import {
  LocationOn,
  CalendarToday,
  Facebook,
  WhatsApp,
  LinkedIn,
  Twitter,
} from '@mui/icons-material';

import '../styles/EventInfoPage.css'; 

function EventInfoPage() {
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
            <Box className="date-time-box" sx={{ position: 'absolute', top: '30%', left: '70%', transform: 'translate(-20%, -0%)', zIndex: 2 }}>
                <Card sx={{ padding: '20px', width: '100%' }}>
                    <CardContent>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Date & time
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <CalendarToday sx={{ marginRight: '8px' }} />
                            <Typography variant="body1">{event.date}</Typography>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ textTransform: 'none', marginTop: '20px' }}
                        >
                            Book now
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
        </Box>
        <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
            <Box sx={{ padding: '20px' }}>
            <EventDetailRender htmlString={event.details} />
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

export default EventInfoPage;
