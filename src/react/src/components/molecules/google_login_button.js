/*
-------------------------------------------------------------------------------
Program:    google_login_button.js
Author:     Justin Clark
Date:       2025-04-04
Language:   JavaScript
Purpose:    This component is a Google login button that uses the Google OAuth API to authenticate users.
-------------------------------------------------------------------------------
Change Log:
Who  When           What
JC   2025-04-04     craeted the google login button component
JC   2025-04-05     added functionality to handle success and failure responses
-------------------------------------------------------------------------------
*/

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
        navigate("/home");
    };

    const clientId = process.env.REACT_APP_CLIENT_ID;

    if (!clientId) {
        console.error("Google client ID is not set in environment variables.");
        return (
            <p>Google Authentication has encountered an error</p>
        );
    }
    else {
        return (
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin onSuccess={handleSuccess} onError={handleFaliure}/>
            </GoogleOAuthProvider>
        );
    }
}

export default GoogleLoginButton;
