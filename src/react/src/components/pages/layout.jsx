/*
-------------------------------------------------------------------------------
Program:    layout.js
Author:     Justin Clark
Date:       03/07/2025
Language:   javascript
Purpose:    layout for the application pages
-------------------------------------------------------------------------------
Change Log:
Who  When           What
JC  03.07.2025     set layout for the application pages
-------------------------------------------------------------------------------
*/

import { Outlet, Link } from "react-router-dom";

// import price from "../../price.png"

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    {/* <li>
                        <img src={price} alt="Price Logo" id="icon" />
                    </li> */}
                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    <li><Link>/</Link></li>
                    
                    <li>
                        <Link to="/prices">Prices</Link>
                    </li>
                    
                    <li><Link>/</Link></li>
                    
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;