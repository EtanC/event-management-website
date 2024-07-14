import { Box, Button } from '@mui/material';

const EditButtons = ({ isEditing, handleEditClick, updateProfile }) => (
    <Box sx={styles.flexbox}>
        {!isEditing ? (
            <Button
                variant="contained" color="primary"
                sx={{ width: '300px', borderRadius: '20px', textTransform: 'none', fontWeight: 'bold' }}
                onClick={handleEditClick}
            >
                Edit
            </Button>
        ) : (
            <>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '20px' }}>
                    <Button
                        variant="outlined" color="primary"
                        sx={{ width: '150px', borderRadius: '20px', textTransform: 'none', fontWeight: 'bold' }}
                        onClick={handleEditClick}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained" color="primary"
                        sx={{ width: '150px', borderRadius: '20px', textTransform: 'none', fontWeight: 'bold' }}
                        onClick={updateProfile}
                    >
                        Save
                    </Button>
                </Box>
            </>
        )}
    </Box>
);

const styles = {
    flexbox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
};

export default EditButtons;
