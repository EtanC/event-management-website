import { Box, Container, Card, Typography } from '@mui/material';
import Navbar from '../components/Navbar';

function MyEvents() {

    return (
        <>
            <Navbar />
            <Box sx={{ backgroundColor: '#f5f5f5', padding: '20px 0', minHeight: '90vh' }}>
                <Container maxWidth="lg">
                    <Card sx={styles.flexCard}>

                        <Typography variant="h6" component="h2">My Hosted Events</Typography>
                        <Typography> insert event cards</Typography>
                    </Card>
                    <Card sx={styles.flexCard}>

                        <Typography variant="h6" component="h2">My Registered Events</Typography>
                        <Typography> insert event cards</Typography>
                    </Card>

                </Container>

            </Box>
        </>
    )
}

const styles = {
    flexbox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    flexCard: {
        marginBottom: '30px',
        borderRadius: '10px',
        padding: '25px'
    },
    headerFont: {
        fontWeight: 'bold',
        fontSize: '18px',
        marginBottom: '20px',
    }
}

export default MyEvents;