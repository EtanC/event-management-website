import { useProfile } from '../components/ProfileProvider';
import { useState } from 'react';
import UnauthorisedPopup from './unauthroisedPopups/UnauthorisedPopup';
import AdminUnauthorisedPopup from './AdminUnauthorsedPopUp';

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated, profileData } = useProfile();
    const [popupOpen, setPopupOpen] = useState(false);

    if (!isAuthenticated) {
        return (
            <>
                <UnauthorisedPopup open={!isAuthenticated} handleClose={() => setPopupOpen(false)} />
            </>
        );
    }

    if (isAuthenticated && !profileData?.is_admin) {
        return (
            <>
                <AdminUnauthorisedPopup open={isAuthenticated && !profileData?.is_admin} handleClose={() => setPopupOpen(false)} />
            </>
        );
    }

    return element;
};

export default ProtectedRoute;
