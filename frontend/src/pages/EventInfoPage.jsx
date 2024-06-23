import { useLocation } from 'react-router-dom';
import '../styles/EventInfo.css';
import Navbar from '../components/Navbar';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    IconButton,
    Typography
} from '@mui/material';
import { LocationOn, CalendarToday, Facebook, WhatsApp, LinkedIn, Twitter } from '@mui/icons-material';

function EventInfoPage() {
  const location = useLocation();
  const { event } = location.state;

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
        <Card>
          <CardContent>
            <Box className="header-container">
              <Box className="header-container2" sx={{ width: '65%' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {event.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  {event.details}
                </Typography>
              </Box>
              <Card sx={{ padding: '20px' }}>
                <CardContent>
                  <Box className="header-container2">
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" component="h2" gutterBottom>
                        Date & time
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <CalendarToday sx={{ marginRight: '8px' }} />
                        <Typography variant="body1">{event.date}</Typography>
                      </Box>
                    </Grid>
                    <Button variant="contained" color="primary" sx={{ marginBottom: '20px' }}>
                      Book now
                    </Button>
                    <Button variant="outlined" sx={{ marginBottom: '20px', marginLeft: '10px' }}>
                      Program promoter
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </CardContent>
        </Card>
        <Box className="header-container">
          <Box className="header-container2" sx={{ width: '65%' }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              {event.details}
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              Submission Deadline
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              {event.deadline}
            </Typography>
          </Box>
          <Box className="header-container2">
            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Event location
                </Typography>
                <Box display="flex" alignItems="center">
                  <LocationOn sx={{ marginRight: '8px' }} />
                  <Typography variant="body1">{event.location}</Typography>
                </Box>
              </Grid>
            </Grid>
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
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default EventInfoPage;
