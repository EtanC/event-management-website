import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const manageSessionAndNavigate = async (token, navigate) => {
    const decodedToken = jwtDecode(token);
    const sessionEndTime = decodedToken.session_end_time;

    localStorage.setItem('token', token);
    localStorage.setItem('session_end_time', sessionEndTime);

    // Set timeout to log out the user when the session expires
    const sessionExpiryTime = new Date(sessionEndTime).getTime() - new Date().getTime();
    setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('session_end_time');
        navigate('/login');
    }, sessionExpiryTime);

    // actually necessary - allows for navbar to fetch profile & load in time
    await sleep(3000);
    navigate('/'); // navigate to home
};

export const handleLogin = async (email, password, navigate, setErrorMessage, setIsLoading) => {
    setIsLoading(true);
    try {
        const response = await axios.post('http://127.0.0.1:5000/auth/login', {
            email,
            password,
        });

        const token = response.data.token;
        await manageSessionAndNavigate(token, navigate);
    } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data.description : error.message);
        setErrorMessage(error.response ? error.response.data.description : error.message);
    } finally {
        setIsLoading(false);
    }
};

export const handleRegister = async (email, password, name, setErrorMessage, setIsLoading, navigate) => {
    setIsLoading(true);

    try {
        const response = await axios.post('http://127.0.0.1:5000/auth/register', {
            email,
            password,
            username: name,
        });

        const token = response.data.token;
        await manageSessionAndNavigate(token, navigate);
    } catch (error) {
        console.error('Error registering:', error.response ? error.response.data.description : error.message);
        setErrorMessage(error.response ? error.response.data.description : error.message);
        setIsLoading(false);
    }
};

export const handleLogout = async (navigate, setAuth) => {
    try {
        const token = localStorage.getItem('token');
        await axios.post('http://127.0.0.1:5000/auth/logout', { token });

        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('session_end_time');

        // Update auth state
        setAuth(false);

        // Navigate to login page
        navigate('/');
    } catch (error) {
        console.error('Error logging out:', error.response ? error.response.data.description : error.message);
    }
};