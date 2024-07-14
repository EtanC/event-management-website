import axios from 'axios';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const manageSessionAndNavigate = async (navigate) => {
    await sleep(1000); // stimulate loading phase, get rid of it if you wish :(
    navigate('/'); // navigate to home
};

export const handleLogin = async (email, password, navigate, setErrorMessage, setIsLoading) => {
    setIsLoading(true);
    try {
        await axios.post('http://127.0.0.1:5000/auth/login', { email, password }, { withCredentials: true });
        await manageSessionAndNavigate(navigate);
    } catch (error) {
        setErrorMessage(error.response ? error.response.data.description : error.message);
    } finally {
        setIsLoading(false);
    }
};

export const handleRegister = async (email, password, name, setErrorMessage, setIsLoading, navigate) => {
    setIsLoading(true);
    try {
        await axios.post('http://127.0.0.1:5000/auth/register', { email, password, username: name }, { withCredentials: true });
        await manageSessionAndNavigate(navigate);
    } catch (error) {
        setErrorMessage(error.response ? error.response.data.description : error.message);
    } finally {
        setIsLoading(false);
    }
};

export const handleLogout = async (navigate) => {
    try {
        await axios.post('http://127.0.0.1:5000/auth/logout', {}, { withCredentials: true });
        navigate('/');
    } catch (error) {
        console.error('Error logging out:', error.response ? error.response.data.description : error.message);
    }
};
