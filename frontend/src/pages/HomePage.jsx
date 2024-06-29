import { useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from '../components/Navbar';
import EventLoading from '../components/MainEventCardSection';
import defaultImage from '../Image/default-image.jpg';
import NewEventButton from '../components/NewEventButton'

function HomePage() {
    const navigate = useNavigate();

    const handleImageClick = () => {
        navigate('/event/0');
    };

    return (
        <>
            <Navbar />
            <Box sx={{ backgroundColor: '#f5f5f5', padding: '20px 0' }}>
                <Container maxWidth="lg">
                    <NewEventButton />
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

                    <EventLoading />

                </Container>
            </Box>
        </>
    );
}

export default HomePage;
