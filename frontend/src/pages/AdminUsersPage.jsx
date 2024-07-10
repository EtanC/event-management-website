import { useState, useEffect } from 'react';
import { Typography, Box, Container, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import AdminTable from '../components/AdminTable';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const AdminUsersPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [lastLogin, setLastLogin] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [locations, setLocations] = useState([]);

    const userData = [
        { id: '001', fullName: 'Ethan Chen', email: '111@gmail.com', level: 'User', lastLogin: '11/06/2023' },
        { id: '002', fullName: 'John Smith', email: '113@gmail.com', level: 'User', lastLogin: '11/06/2024' },
    ];

    const filterEvents = (name) => {
        return userData.filter(user => {
            const nameMatch = name === '' || user.fullName.toLowerCase().includes(name.toLowerCase());
            return nameMatch;
        });
    };

    useEffect(() => {
        const result = filterEvents(name, email, lastLogin);
        setFilteredData(result);
    }, [name, email, lastLogin]);

    const handleRoleChange = (event, userId) => {
        const newRole = event.target.value;
        console.log(`User ${userId} level changed to ${newRole}`);
    };

    const handleDelete = (userId) => {
        console.log(`User ${userId} deleted`);
    };

    const columns = [
        { field: 'fullName', headerName: 'Full Name' },
        { field: 'email', headerName: 'Email' },
        { field: 'level', headerName: 'Role' },
        { field: 'lastLogin', headerName: 'Last Login' }
    ];

    return (
        <>
            <Navbar />
            <Box sx={{ backgroundColor: '#f5f5f5', padding: '40px 0', height: '90vh' }}>
                <Container maxWidth="lg">
                    <Box sx={styles.flexBox}>
                        <Typography variant="h4">
                            <MuiLink component={Link} to="/admin" sx={{ textDecoration: 'none', color: 'gray' }}>
                                Admin
                            </MuiLink>
                        </Typography>
                        <ArrowForwardIosIcon sx={{ marginTop: '10px', marginLeft: '15px', marginRight: '15px' }} />
                        <Typography variant="h4"> Users</Typography>
                    </Box>
                    <SearchBar
                        labelOne='Full Name'
                        labelTwo='Email'
                        eventType={name}
                        setEventType={setName}
                        location={email}
                        setLocation={setEmail}
                        locations={locations}
                        date={lastLogin}
                        setDate={setLastLogin}
                    />
                    {filteredData.length === 0 ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                            <Typography variant="h6" color="textSecondary">
                                No search results
                            </Typography>
                        </Box>
                    ) : (
                        <AdminTable
                            columns={columns}
                            data={filteredData}
                            handleChange={handleRoleChange}
                            handleDelete={handleDelete}
                        />
                    )}
                </Container>
            </Box>
        </>
    );
};

const styles = {
    flexBox: {
        display: 'flex',
        marginBottom: 5
    }
};

export default AdminUsersPage;
