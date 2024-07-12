import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useSessionValidation = (intervalTime = 300000) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Initially true to prevent initial popup

    useEffect(() => {
        const checkSession = () => {
            const token = Cookies.get('token');
            setIsAuthenticated(!!token);
        };

        // Initial check
        checkSession();

        // Set interval for periodic checks
        const interval = setInterval(checkSession, intervalTime);
        return () => clearInterval(interval);
    }, [intervalTime]);

    return isAuthenticated;
};

export default useSessionValidation;
