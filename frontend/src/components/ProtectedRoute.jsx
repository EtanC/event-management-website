import { useProfile } from '../components/ProfileProvider';
import { useState } from 'react';
import UnauthorisedPopup from './popups/UnauthorisedPopup';
import AdminUnauthorisedPopup from './popups/AdminUnauthorsedPopUp';

const ProtectedRoute = ({ element, requireAdmin = false }) => {
    const { isAuthenticated, profileData } = useProfile();
    const [popupOpen, setPopupOpen] = useState(false);

    if (!isAuthenticated) {
        return (
            <>
                <UnauthorisedPopup open={!isAuthenticated} handleClose={() => setPopupOpen(false)} />
            </>
        );
    }

    if (requireAdmin && !profileData?.is_admin) {
        return (
            <>
                <AdminUnauthorisedPopup open={isAuthenticated && !profileData?.is_admin} handleClose={() => setPopupOpen(false)} />
            </>
        );
    }

    return element;
};

export default ProtectedRoute;
