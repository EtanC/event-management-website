import { useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import EventLoading from '../components/MainEventCardSection';
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
                            height: '10%'
                        }}
                    />
                </Box>

                <EventLoading />

            </Container>
        </>
    );
}

export default HomePage;
