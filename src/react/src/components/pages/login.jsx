/*
-------------------------------------------------------------------------------
Program:    login.js
Author:     Justin Clark
Date:       03/07/2025
Language:   javascript
Purpose:    display login page
-------------------------------------------------------------------------------
Change Log:
Who  When           What
JC  03.07.2025     Created google login button
-------------------------------------------------------------------------------
*/

import GoogleLoginButton from "../molecules/google_login_button";

const Login = () => { 
    return (
        <div>
            <h2>Sign in to access more features</h2>
            <GoogleLoginButton />
        </div>
    )
};

export default Login;
