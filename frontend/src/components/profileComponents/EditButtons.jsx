import { Box, Button } from '@mui/material';
import '../../styles/Profile.css';

const EditButtons = ({ isEditing, handleEditClick, updateProfile }) => (
    <Box className="flexbox">
        {!isEditing ? (
            <Button
                variant="contained"
                color="primary"
                className="button-common button-edit"
                onClick={handleEditClick}
            >
                Edit
            </Button>
        ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '20px' }}>
                <Button
                    variant="outlined"
                    color="primary"
                    className="button-common"
                    onClick={handleEditClick}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className="button-common"
                    onClick={updateProfile}
                >
                    Save
                </Button>
            </Box>
        )}
    </Box>
);

export default EditButtons;
