import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient("https://your-supabase-url.supabase.co", "your-public-anon-key");

const GoogleLoginButton = () => {
    const navigate = useNavigate();
    const clientId = process.env.REACT_APP_CLIENT_ID;

    const handleSuccess = async (response) => {
        console.log("Google sign-in success:", response);

        try {
            // Decode Google ID token and get user info
            const userInfo = await fetchUserInfo(response.credential);

            if (!userInfo) {
                console.error("Failed to retrieve user info");
                return;
            }

            console.log("User Info:", userInfo);

            // Update last_login in Supabase
            await updateLastLogin(userInfo.sub);

            // Redirect after successful login
            navigate("/home");
        } catch (error) {
            console.error("Error handling Google login:", error);
        }
    };

    const handleFailure = (response) => {
        console.error("Google sign-in failed:", response);
        navigate("/trends");
    };

    // Fetch user info from Google ID token
    const fetchUserInfo = async (idToken) => {
        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
        const data = await response.json();
        return data; // Returns user info (includes `sub`, which is the Google user ID)
    };

    // Update last_login timestamp in Supabase
    const updateLastLogin = async (userId) => {
        const { error } = await supabase
            .from("Login")
            .upsert({ user_id: userId, last_login: new Date().toISOString() }, { onConflict: ['user_id'] });

        if (error) {
            console.error("Error updating last login:", error.message);
        } else {
            console.log("Last login timestamp updated in Supabase");
        }
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;