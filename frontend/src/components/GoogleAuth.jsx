import { useGoogleLogin} from '@react-oauth/google'; 
import { IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function GoogleAuth({ setTokenExpires }) {
  const navigate = useNavigate();

    async function getUserInfo(codeResponse) {
        try {
            const response = await axios.post('http://127.0.0.1:5000/auth/google_login', {code: codeResponse.code}, { withCredentials: true });
            return {
                status: response.status,
                body: response.data,
            };
            } catch (error) {
            error(error.response ? error.response.data.description : error.message)
            return null;
        }
    }

    const googleLogin = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async (codeResponse) => {
        let res = await getUserInfo(codeResponse);
        setTokenExpires(new Date(res.body['session_end_time']));
        navigate('/')
        },
    });

    return (
        <IconButton onClick={() => googleLogin()}>
            <GoogleIcon/>
        </IconButton>
    )
}

export default GoogleAuth