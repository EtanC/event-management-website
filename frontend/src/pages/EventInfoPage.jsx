// styles
import '../styles/EventInfoPage.css';

// components
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'

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
import { Facebook, WhatsApp, LinkedIn, Twitter, ArrowBackIosNew } from '@mui/icons-material';

function EventInfoPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
        <Card>
          <CardContent>
            <Box sx={{ paddingLeft: '50px', paddingTop: '20px' }}>
              <Button
                variant='contained'
                sx={{ textTransform: 'none', color: 'primary' }}
                onClick={() => { navigate('/') }}
              >
                <ArrowBackIosNew fontSize='small' sx={{ marginRight: '5px' }} />
                Back
              </Button>
            </Box>
            <Box className="header-container">
              <Box className="header-container2" sx={{ width: '55%', justifyContent: 'space-between' }}>
                <Typography variant="h4">
                  7th International Conference on Microbiome Engineering
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  This conference brings together scientists across the quickly growing field of microbiome engineering. The conference integrates synthetic biology, systems biology, microbial ecology, and bioinformatics across a range of application spaces.
                </Typography>
              </Box>
              <Card sx={{ padding: '20px', width: '35%' }}>
                <CardContent>
                  <Box className="header-container2">
                    <Grid item xs={12} md={6}>
                      <Typography className="header-font">
                        Date & time
                      </Typography>
                      <Typography variant="body2">Nov 12, 2024 - Nov 14, 2024</Typography>
                      <Typography variant="body2">Add to calendar</Typography>
                    </Grid>
                    <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
                      Book now
                    </Button>
                    <Button variant="outlined" sx={{ textTransform: 'none' }}>
                      Program promoter
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </CardContent>
        </Card>
        <Box className="header-container">
          <Box className="header-container2" sx={{ width: '60%' }}>

            {/* Description */}
            <Box>
              <Typography className="header-font">Description</Typography>
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
            </Box>
            {/* Dates */}
            <Box>
              <Typography className="header-font">Dates</Typography>
              <Typography variant="body1" color="textSecondary" paragraph>Start Date: <span className='highlight-font'>Nov 12, 2024</span></Typography>
              <Typography variant="body1" color="textSecondary" paragraph>End Date: <span className='highlight-font'>Nov 14, 2024</span></Typography>
            </Box>
            {/* Submission Deadline */}
            <Box>
              <Typography className="header-font">Submission Deadline</Typography>
              <Typography variant="body1" color="textSecondary" paragraph>Submission Date: <span className='highlight-font'>Jul 22, 2024</span></Typography>
            </Box>
          </Box>

          <Box className="header-container2" sx={{ width: '30%' }}>
            <Box>
              <Typography className="header-font">Event location</Typography>
              <Box display="flex" alignItems="center">
                <LocationOn sx={{ marginRight: '8px' }} />
                <Typography variant="body1">BOSTON, MA</Typography>
              </Box>
            </Box>
            <Box>
              <Typography className="header-font">Tags</Typography>
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
            </Box>
            <Box>
              <Typography className="header-font">
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
        </Box>
      </Container>
    </>
  )
}

export default EventInfoPage