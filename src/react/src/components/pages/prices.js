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

import { useState } from 'react'; // react state hook

import Button from '../atoms/button'

import "../../styles/prices.css"

const Prices = () => {

    let stores = ['Walmart', 'Target', 'Best Buy', 'Amazon', 'Costco', 'Sam\'s Club', 'Kroger', 'Aldi', 'Trader Joe\'s', 'Whole Foods']; // list of stores
    // let categories = ['Electronics', 'Clothing', 'Home Goods', 'Groceries', 'Health & Beauty', 'Toys & Games', 'Sports & Outdoors', 'Automotive', 'Books & Media']; // list of categories
    let storeFound = true; // flag for store found

    const [buttons, setButtons] = useState([]); // state for button list
    const [inputValue, setInputValue] = useState(''); // state for input value

    const handleInputChange = (event) => {
        setInputValue(event.target.value); // update input value
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // prevent form submission
        handleClick(); // call handleClick function
    }

    const handleClick = () => {
        // Check if input value is empty
        if (inputValue === '') {
            console.log('Input is empty');
            storeFound = false;
            return;
        }

        // Check if input value is a valid store
        for (let i = 0; i < stores.length; i++) {
            if (stores[i].toLowerCase().includes(inputValue.toLowerCase())) {
                // Check if store is already in button list
                if (buttons.includes(stores[i])) {
                    console.log(`${inputValue} | Store already in list : ${stores[i]}`);
                    return;
                }

                // add store to button list ( unique store found :) )
                setButtons([...buttons, stores[i]]);
                break;
            }
        }

        if (!storeFound) {
            // store not found :(
            console.log(`${inputValue} | Store not found : ${inputValue}`);
            setButtons([]); // reset buttons
        }

        // reset input value
        setInputValue('');
        storeFound = false;
    };

    return (
        <div>
            <h2>My Prices Tab</h2>
            <p>
                In the My Prices Tab, users can lock in up to 10 items they want to monitor for price changes. 
                PriceScout will continuously track these items, alerting users to any significant price drops or increases. 
                This personalized tracking feature ensures users never miss an opportunity to save.
            </p>

            <div className="searchBox">
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={handleInputChange} placeholder="Search products"></input>
                </form>

                <Button onClick={handleClick}>Submit</Button>

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

            {!storeFound && <p>No stores found</p>}
        </div>
    );
};

export default Prices;
