// styles
import '../styles/EventInfo.css';
import '../App.css';

// components
import Navbar from '../components/Navbar'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


function EventInfoPage() {
  return (
    <>
      <Navbar />
      <Typography>
        Hello Testing
      </Typography>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          backgroundColor: 'white'
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="standard-basic" label="Standard" variant="standard" />
      </Box>
    </>
  )
}

export default EventInfoPage