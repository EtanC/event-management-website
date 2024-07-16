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
            <Box sx={{ backgroundColor: '#f5f5f5', padding: '20px 0' }}>
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            position: 'relative',
                            cursor: 'pointer',
                            marginBottom: '20px',
                        }}
                        onClick={handleImageClick}
                    >
                        <img
                            src={defaultImage}
                            alt="Default Event"
                            style={{
                                width: '100%',
                                borderRadius: '8px',
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