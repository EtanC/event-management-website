import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HtmlTagRender from '../components/HtmlTagRender';
import EventDetail from '../components/EventDetail';
import defaultImage from '../Image/eventInfo-background.jpeg';
import theme from '../styles/Theme';
import { ThemeProvider } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Chip } from '@mui/material';

import {
    Accordion,
    Box,
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    IconButton,
    CircularProgress,
    AccordionSummary,
    AccordionDetails,
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
    const [event, setEvent] = useState(location.state.event);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
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
                            src={event.image ? `/static/random_background/${event.image}.jpg` : defaultImage}
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
                        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-80%, -80%)', zIndex: 2, textAlign: 'center', }}>
                            <Typography variant="h4" component="h1" className="event-title" sx={{ fontWeight: 'bold', color: 'white', wordWrap: 'break-word' }}>
                                {event.name}
                            </Typography>
                        </Box>
                        <EventDetail event={event} setEvent={setEvent}/>
                    </Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Box sx={{ padding: '20px' }}>
                                {isLoading ? (
                                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                        <CircularProgress />
                                    </Box>
                                ) : (
                                    <div>
                                        {event.ai_description && <Accordion defaultExpanded>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <Typography variant="h6" component="h2">AI Summary</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    {event.ai_description}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>}
                                        <HtmlTagRender htmlString={event.details} />
                                    </div>
                                )}
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
                                            Tags
                                        </Typography>
                                        <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
                                        {/* shoudn't happen but just incase some events don't have tags yet, assign it as unspecified on the*/}
                                            {(event.tags && event.tags.length > 0 ? event.tags : ['Unspecified']).map((tag, index) => (
                                                <Chip key={index} label={tag} />
                                            ))}
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
            </ThemeProvider>
        </>
    );
}

export default EventDetailPage;
