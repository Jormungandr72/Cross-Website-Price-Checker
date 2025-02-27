import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
    const handleSuccess = (response) => {
        console.log("Google sign-in success", response);
        // send auth to backend
    };

    const handleFaliure = (response) => {
        console.error("Google sign-in failed:", response);
    };

    const clientId = process.env.REACT_APP_CLIENT_ID

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin onSuccess={handleSuccess} onError={handleFaliure}/>
        </GoogleOAuthProvider>
    );
}

export default GoogleLoginButton;
