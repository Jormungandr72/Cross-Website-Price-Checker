import { Outlet, Link } from "react-router-dom";

import price from "../price.png"

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <img src={price} alt="Price Logo" id="icon" />
                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/trends">Trends</Link>
                    </li>
                    <li>
                        <Link to="/prices">Prices</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;