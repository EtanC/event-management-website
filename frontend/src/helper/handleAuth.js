import axios from 'axios';
import config from '../config'


const manageSessionAndNavigate = async (navigate) => {
    navigate('/'); // navigate to home
};

export const handleLogin = async (email, password, navigate, setErrorMessage, setIsLoading, setTokenExpires) => {
    setIsLoading(true);
    try {
        const response = await axios.post(`${config.apiBaseUrl}/auth/login`, { email, password }, { withCredentials: true });
        setTokenExpires(new Date(response.data['session_end_time']))
        console.log(response.data['session_end_time'])
        await manageSessionAndNavigate(navigate);
    } catch (error) {
        setErrorMessage(error.response ? error.response.data.description : error.message);
    } finally {
        setIsLoading(false);
    }
};

export const handleRegister = async (username, email, password, full_name, job_title, fun_fact, description, preferences, setErrorMessage, setIsLoading, navigate, setTokenExpires) => {
    setIsLoading(true);
    try {
        const response = await axios.post(`${config.apiBaseUrl}/auth/register`, { username, email, password, full_name, job_title, fun_fact, description, preferences }, { withCredentials: true });
        setTokenExpires(new Date(response.data['session_end_time']))
        await manageSessionAndNavigate(navigate);
    } catch (error) {
        setErrorMessage(error.response ? error.response.data.description : error.message);
    } finally {
        setIsLoading(false);
    }
};

export const handleLogout = async (navigate, setTokenExpires) => {
    try {
        const response = await axios.post(`${config.apiBaseUrl}/auth/logout`, {}, { withCredentials: true });
        if (response.status == 200) {
            const expires = new Date()
            console.log(expires)
            setTokenExpires(expires)
        }
        navigate('/');
    } catch (error) {
        console.error('Error logging out:', error.response ? error.response.data.description : error.message);
    }
};
