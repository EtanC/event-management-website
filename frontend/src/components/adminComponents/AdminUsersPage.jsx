import { useState, useEffect } from 'react';
import { Typography, Box, Container } from '@mui/material';
import AdminUsersSearchBar from './AdminUsersSearchBar';
import AdminTable from './AdminTable';
import ActionConfirmationPopup from '../ActionConfirmationPopup';
import { fetchAllUsers, toggleAdminStatus, deleteUser } from '../../helper/handleUsers';

const AdminUsersPage = () => {
    const [email, setEmail] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const [deletePopupOpen, setDeletePopupOpen] = useState(false);
    const [action, setAction] = useState(''); // 'makeAdmin' or 'revokeAdmin'

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetchAllUsers();
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

    const handleRoleChange = (event, username) => {
        const newRole = event.target.value;
        setSelectedUser({ username, newRole });
        setAction(newRole === 'admin' ? 'makeAdmin' : 'revokeAdmin');
        setPopupOpen(true);
    };

    const handleAdminChangeConfirm = async () => {
        const { username, newRole } = selectedUser;
        const actionType = newRole === 'admin' ? 'invite' : 'remove';

        try {
            await toggleAdminStatus(actionType, username);
            setUserData(prevData =>
                prevData.map(user =>
                    user.username === username ? { ...user, role: newRole } : user
                )
            );
        } catch (error) {
            console.error(`Failed to change role for user ${username}:`, error);
        }

        setPopupOpen(false);
        setSelectedUser(null);
    };

    const handleClose = () => {
        setPopupOpen(false);
        setSelectedUser(null);
    };

    const handleDeleteUser = async (user_id) => {
        try {
            await deleteUser(user_id);
            setUserData(prevData => prevData.filter(user => user._id !== user_id));
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
        setDeletePopupOpen(false);
    };

    const handleOpenDeletePopup = (user) => {
        setSelectedUser(user);
        setDeletePopupOpen(true);
    };

    const handleDeleteClose = () => {
        setDeletePopupOpen(false);
        setSelectedUser(null);
    };

    const columns = [
        { field: 'username', headerName: 'Username', width: '20vw' },
        { field: 'full_name', headerName: 'Full Name', width: '20vw' },
        { field: 'email', headerName: 'Email', width: '20vw' },
    ];

    return (
        <>
            <Container maxWidth="lg" sx={{ minHeight: '85vh' }}>
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
                        handleDelete={(item) => handleOpenDeletePopup(item)}
                        handleRoleChange={handleRoleChange}
                        showActions={true}
                        showDropdown={true}
                    />
                )}
                <ActionConfirmationPopup
                    open={popupOpen}
                    onClose={handleClose}
                    onConfirm={handleAdminChangeConfirm}
                    title={action === 'makeAdmin' ? 'Make User an Admin' : 'Revoke Admin Privileges'}
                    content={action === 'makeAdmin' ?
                        'Are you sure you want to make this user an admin?' :
                        'Are you sure you want to revoke admin privileges from this user?'}
                    primaryButtonText={action === 'makeAdmin' ? 'Make Admin' : 'Revoke Admin'}
                />
                <ActionConfirmationPopup
                    open={deletePopupOpen}
                    onClose={handleDeleteClose}
                    onConfirm={() => handleDeleteUser(selectedUser._id)}
                    title={'Delete User'}
                    content={'Are you sure you want to delete this user? This action cannot be undone.'}
                    primaryButtonText={'Delete'}
                />
            </Container>
        </>
    );
};

export default AdminUsersPage;
