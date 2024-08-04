/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { TextField, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const inputStyles = {
    borderRadius: '15px',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#B2B6B6' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#B2B6B6' },
    '& .MuiInputBase-input': { color: '#B2B6B6' },
    '& .MuiFormLabel-root': { color: '#B2B6B6' },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': { color: '#B2B6B6' }
};


const AdminUsersSearchBar = ({ labelOne, email, setEmail }) => (
    <Box
        sx={{
            display: 'flex',
            alignContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '30px',
            backgroundColor: '#1E4830',
            padding: '20px',
            borderRadius: '15px',
            zIndex: 2,
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: '10px' }}>
            <TextField
                label={labelOne}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                sx={{ flex: 1, ...inputStyles }}
            />
        </Box>
    </Box>
);

export default AdminUsersSearchBar;
