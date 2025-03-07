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
-------------------------------------------------------------------------------
*/

import { useState } from 'react'; // react state hook

import Button from '../atoms/button'

import "../../styles/prices.css"

const Prices = () => {
    const [buttons, setButtons] = useState([]);

    const handleClick = () => {
        
        // button list, state updates when length changes
        const newButtons = [
            `Button ${buttons.length + 1}`,
            `Button ${buttons.length + 2}`,
            `Button ${buttons.length + 3}`,
        ];
        setButtons(newButtons); // update buttons var to reflect state change
        
        // FIXME: push 3 buttons to end of array to change state and continuously update
        // updates only up to length = 6
        buttons.push(`Button ${buttons.length + 1}`);
        buttons.push(`Button ${buttons.length + 1}`);
        buttons.push(`Button ${buttons.length + 1}`);
    };

    return (
        <div>
            <h2>My Prices Tab</h2>
            <p>
                In the My Prices Tab, users can lock in up to 10 items they want to monitor for price changes. 
                PriceScout will continuously track these items, alerting users to any significant price drops or increases. 
                This personalized tracking feature ensures users never miss an opportunity to save.
            </p>
            
            {/* searchBox div contains all search related components:
                searchbar input box, search confirm button, related buttons created from query */}
            <div class="searchBox">
                <input placeholder="search products"></input>
                <Button onClick={handleClick}>Button as link</Button>

                {buttons.length > 0 && (
                    <div>
                        {buttons.map((label, index) => (
                        <Button key={index} variant="outline">
                            {label}
                        </Button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Prices;
