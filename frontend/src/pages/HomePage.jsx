import { useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import HomePageEventCardSection from '../components/HomePageEventCardSection';
import NewEventButton from '../components/NewEventButton'
import defaultImage from '../Image/default-image.jpg';
import theme from '../styles/Theme';
import { ThemeProvider } from '@mui/material/styles';

function HomePage() {
    const navigate = useNavigate();

    const handleImageClick = () => {
        navigate('/event/0');
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
                        }}
                        onClick={handleImageClick}
                    >
                        <img
                            src={defaultImage}
                            alt="Default Event"
                            style={{
                                width: '100%',
                                height: '350px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                marginBottom: '50px'
                            }}
                        />
                    </Box>

                    <HomePageEventCardSection />

                </Container>
            </Box>
        </>
    );
}

export default HomePage;