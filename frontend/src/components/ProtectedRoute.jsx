import { Navigate } from 'react-router-dom';
import { useProfile } from '../components/ProfileProvider';

const ProtectedRoute = ({ element, ...rest }) => {
    const { isAuthenticated } = useProfile();

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
