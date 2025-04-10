/*
-------------------------------------------------------------------------------
Program:    prices.js
Author:     Justin Clark
Date:       03/07/2025
Language:   javascript
Purpose:    allows users to lock in up to 10 items they want to monitor for price changes
-------------------------------------------------------------------------------
Change Log:
Who  When           What
JC  03.07.2025     description of prices page and buttons
JC  03.09.2025     revised search bar and button functionality
-------------------------------------------------------------------------------
*/

import '../molecules/store_filter';
import "../../styles/prices.css"
import StoreFilter from '../molecules/store_filter';

const Prices = () => {
    return (
        <div>
            <h2>My Prices</h2>
            <p>
                In the My Prices Tab, users can lock in up to 10 items they want to monitor for price changes. 
                PriceScout will continuously track these items, alerting users to any significant price drops or increases. 
                This personalized tracking feature ensures users never miss an opportunity to save.
            </p>
            
            <StoreFilter />
        </div>
    );
};

export default Prices;
