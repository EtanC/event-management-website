import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie';

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
    const token = Cookies.get('token');
    try {
        const user_id = jwtDecode(token).user_id
        console.log(user_id)
        return user_id
    } catch (error) {
        console.error("Invalid Token");
        throw (error);
    }
}