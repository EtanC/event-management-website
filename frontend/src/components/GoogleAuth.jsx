import React from 'react';
import { GoogleOAuthProvider, useGoogleLogin} from '@react-oauth/google'; 
import { IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function GoogleAuth() {
  async function getUserInfo(codeResponse) {
    try {
      console.log(codeResponse)
      const response = await axios.post('http://127.0.0.1:5000/auth/google_login', {code: codeResponse.code}, { withCredentials: true });
      return {
        status: response.status,
        body: response.data,
      };
    } catch (error) {
      console.error("Error:", error);
      return null;
  }
  }

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      res = await getUserInfo(codeResponse);
      console.log(res)
      if (res.status == 200) {
        useNavigate('/')
      }
    },
  });

  return (
    <IconButton onClick={() => googleLogin()}>
      <GoogleIcon/>
    </IconButton>
  )
}

export default GoogleAuth