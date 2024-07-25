import { useState, useEffect } from 'react';
import { Typography, Box, Container, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import AdminUsersSearchBar from '../components/adminComponents/AdminUsersSearchBar';
import AdminTable from '../components/adminComponents/AdminTable';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { fetchAllUsers, toggleAdminStatus } from '../helper/handleUsers';

const AdminUsersPage = () => {
    const [email, setEmail] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetchAllUsers();
                console.log(response)
                const users = response.users.map(user => ({
                    _id: user._id,
                    username: user.username,
                    full_name: user.full_name || '',
                    email: user.email,
                    role: user.is_admin ? 'admin' : 'user'
                }));
                setUserData(users);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        getUsers();
    }, []);

    const filterUsers = (email) => {
        return userData.filter(user => {
            const emailMatch = email === '' || user.email.toLowerCase().includes(email.toLowerCase());
            return emailMatch;
        });
    };

    useEffect(() => {
        const result = filterUsers(email);
        setFilteredData(result);
    }, [email, userData]);

    const handleRoleChange = async (event, username) => {
        const newRole = event.target.value;
        const action = newRole === 'admin' ? 'invite' : 'remove';

        try {
            await toggleAdminStatus(action, username);
            setUserData(prevData =>
                prevData.map(user =>
                    user.username === username ? { ...user, role: newRole } : user
                )
            );
        } catch (error) {
            console.error(`Failed to change role for user ${username}:`, error);
        }
    };


    const columns = [
        { field: 'username', headerName: 'Username', width: '20vw' },
        { field: 'full_name', headerName: 'Full Name', width: '20vw' },
        { field: 'email', headerName: 'Email', width: '20vw' },
    ];

    return (
        <>
            <Container maxWidth="lg" sx={{ minHeight: '85vh' }}>
                <Box sx={styles.flexBox}>
                    <Typography variant="h4">
                        <MuiLink component={Link} to="/admin" sx={{ textDecoration: 'none', color: 'gray' }}>
                            Admin
                        </MuiLink>
                    </Typography>
                    <ArrowForwardIosIcon sx={{ marginTop: '10px', marginLeft: '15px', marginRight: '15px' }} />
                    <Typography variant="h4"> Users</Typography>
                </Box>
                <AdminUsersSearchBar
                    labelOne='Email'
                    email={email}
                    setEmail={setEmail}
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
                        handleRoleChange={handleRoleChange}
                        showActions={false}
                        showDropdown={true}
                    />
                )}
            </Container>
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
