import { jwtDecode } from 'jwt-decode';

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

export const getUserId = () => {
    const token = localStorage.getItem('token');
    try {
        return jwtDecode(token).user_id;
    } catch (error) {
        console.error("Invalid Token");
        throw (error);
    }
}

export const checkUserIsEventOwner = (user_id) => {
    if (user_id === getUserId()) return true
    else return false
}