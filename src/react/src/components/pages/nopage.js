/*
-------------------------------------------------------------------------------
Program:    nopage.js
Author:     Justin Clark
Date:       03/07/2025
Language:   javascript
Purpose:    display *404* error page
-------------------------------------------------------------------------------
Change Log:
Who  When           What
JC  03.07.2025     Created 404 error page
-------------------------------------------------------------------------------
*/

const NoPage = () => {
    return (
        <div>
            <h1>Error 404</h1>
            <p>That page doesn't exist!</p>
        </div>
    );
};

export default NoPage;