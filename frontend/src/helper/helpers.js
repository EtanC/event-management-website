import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie';

// Event Helpers

// Help format 2 types of date formats to work synchronously
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    let date;
    // Try to parse as YYYY-MM-DD
    date = new Date(dateString);
    if (!isNaN(date)) return date.toLocaleDateString('en-US', options);
    // Try to parse as MMM D, YYYY
    date = new Date(Date.parse(dateString));
    if (!isNaN(date)) return date.toLocaleDateString('en-US', options);
    return "Invalid date format";
}

// Help get the user_id of the logged in user
export const getUserId = () => {
    const token = Cookies.get('token');
    try {
        const user_id = jwtDecode(token).user_id
        return user_id
    } catch (error) {
        console.error("Invalid Token");
        throw (error);
    }
}

// Profile Helpers
export const handleSnackbar = (setSnackbarMessage, setSnackbarOpen) => (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
};

export const handleImageUpload = (setNewProfilePic) => (event) => {
    const file = event.target.files[0];
    setNewProfilePic(file);
};

// Register Helpers
export const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
};

