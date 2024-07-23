import axios from 'axios';


const manageSessionAndNavigate = async (navigate) => {
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

export const handleRegister = async (username, email, password, full_name, occupation, fun_fact, headline, setErrorMessage, setIsLoading, navigate) => {
    setIsLoading(true);
    try {
        await axios.post('http://127.0.0.1:5000/auth/register', { username, email, password, full_name, occupation, fun_fact, headline }, { withCredentials: true });
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
