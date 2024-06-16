// styles
import '../styles/EventInfo.css';

// components
import Navbar from '../components/Navbar'

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
import { LocationOn, CalendarToday } from '@mui/icons-material';
import { Facebook, WhatsApp, LinkedIn, Twitter } from '@mui/icons-material';

function EventInfoPage() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
        <Card>
          <CardContent>
            <Box className="header-container">
              <Box className="header-container2" sx={{ width: '65%' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  7th International Conference on Microbiome Engineering
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  This conference brings together scientists across the quickly growing field of microbiome engineering. The conference integrates synthetic biology, systems biology, microbial ecology, and bioinformatics across a range of application spaces.
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
                        <Typography variant="body1">Nov 12, 2024 - Nov 14, 2024</Typography>
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
              This conference brings together scientists across the quickly growing field of microbiome engineering. The conference integrates synthetic biology, systems biology, microbial ecology, and bioinformatics across a range of application spaces.
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              SESSION TOPICS:
              <ul>
                <li>Engineering Animal Microbiome Systems</li>
                <li>Engineering Soil Microbiome Systems</li>
                <li>Microbiome Engineering Tool Development</li>
                <li>Microbiome and Probiotic Engineering for Human Health</li>
                <li>Microbiome and Probiotic Engineering for Non-biomedical Applications</li>
                <li>Underlying Science of Microbial Dynamics in Microbiomes</li>
              </ul>
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              Submission Deadline
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Submission Date: Jul 22, 2024
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
                  <Typography variant="body1">BOSTON, MA</Typography>
                </Box>
              </Grid>
            </Grid>
            <Typography variant="h6" component="h2" gutterBottom>
              Tags
            </Typography>
            <Box display="flex" flexWrap="wrap">
              {['Indonesia event', 'Jaskaran event', 'UI', 'Seminar'].map((tag) => (
                <Box
                  key={tag}
                  sx={{
                    background: '#e0e0e0',
                    borderRadius: '16px',
                    padding: '5px 10px',
                    margin: '5px',
                  }}
                >
                  <Typography variant="body2">{tag}</Typography>
                </Box>
              ))}
            </Box>

            <Typography variant="h6" component="h2" gutterBottom sx={{ marginTop: '20px' }}>
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
  )
}

export default EventInfoPage