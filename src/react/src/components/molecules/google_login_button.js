import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {

    const navigate = useNavigate();

    const handleSuccess = (response) => {
        console.log("Google sign-in success", response);
        // send auth to backend
        navigate("/home");
    };

    const handleFaliure = (response) => {
        console.error("Google sign-in failed:", response);
        navigate("/trends");
    };

    const clientId = process.env.REACT_APP_CLIENT_ID

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin onSuccess={handleSuccess} onError={handleFaliure}/>
        </GoogleOAuthProvider>
    );
}

export default GoogleLoginButton;
