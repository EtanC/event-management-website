import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import HomePageEventCardSection from '../components/mainComponents/HomePageEventCardSection';
import NewEventButton from '../components/mainComponents/NewEventButton'
import defaultImage from '../Image/default-image.jpg';
import theme from '../styles/Theme';
import { ThemeProvider } from '@mui/material/styles';
import { increaseEventViewCount } from '../helper/handleEventData';
import config from '../config';

function HomePage() {
    const navigate = useNavigate();

    // clicking on the big image will take you to a random event
    const handleImageClick = async () => {
        try {
            const response = await axios.get(`${config.apiBaseUrl}/events/get/all`);
            const eventData = response.data.events || response.data; // Adjust according to the response structure

            if (eventData.length > 0) {
                const randomEvent = eventData[Math.floor(Math.random() * eventData.length)];
                await increaseEventViewCount(randomEvent._id); // increase view count when clicked
                navigate(`/event/${randomEvent._id}`, { state: { event: randomEvent } });
            } else {
                console.error('No events available to navigate to');
            }
        } catch (err) {
            console.log('Failed to fetch events: ' + err.message);
        }
    };
    return (
        <>
            <ThemeProvider theme={theme}></ThemeProvider>
            <NewEventButton />
            <Box sx={{ backgroundColor: '#f5f5f5'}}>
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            position: 'relative',
                            cursor: 'pointer',
                            '&:hover .hover-text': {
                                opacity: 1,
                            },
                            '&:hover .hover-overlay': {
                                opacity: 0.5,
                            },
                        }}
                        onClick={handleImageClick}
                    >
                        {/* <img
                            src={defaultImage}
                            alt="Default Event"
                            style={{
                                width: '100%',
                                height: {
                                    xs: '200px',
                                    sm: '350px'
                                },
                                objectFit: 'cover',
                                borderRadius: '8px',
                                marginBottom: '50px'
                            }}
                        /> */}
                        <Box 
                            component='img'
                            src={defaultImage}
                            alt="Default Event"
                            sx={{
                                width: '100%',
                                height: {
                                    xs: '200px',
                                    sm: '350px'
                                },
                                objectFit: 'cover',
                                borderRadius: '8px',
                                marginBottom: '50px'
                            }}
                        />
                        <Box
                            className="hover-text"
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                opacity: 0,
                                transition: 'opacity 0.3s ease',
                            }}
                        >
                            Want to check out a random event? 
                        </Box>
                    </Box>

                    <HomePageEventCardSection />

                </Container>
            </Box>
        </>
    );
}

export default HomePage;