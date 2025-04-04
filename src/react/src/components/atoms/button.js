/*
-------------------------------------------------------------------------------
Program:    button.js
Author:     Justin Clark
Date:       2025-04-04
Language:   JavaScript
Purpose:    React component for a button
-------------------------------------------------------------------------------
Change Log:
Who  When           What
JC   2025-04-04     Created
JC   2025-04-05     Added prop types and default props
-------------------------------------------------------------------------------
*/

const Button = ({ onClick, children }) => {
    return (
        <button type="button" onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
