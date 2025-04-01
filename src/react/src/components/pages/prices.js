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

import { useState, useEffect } from 'react'; // react state hook
import axios from 'axios';

// Material UI
// import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";

import Button from '../atoms/button';

import "../../styles/prices.css"

const Prices = () => {
    let stores = ['Walmart', 'Target', 'Best Buy', 'Amazon', 'Costco', 'Sam\'s Club', 'Kroger', 'Aldi', 'Trader Joe\'s', 'Whole Foods']; // list of stores
    // let categories = ['Electronics', 'Clothing', 'Home Goods', 'Groceries', 'Health & Beauty', 'Toys & Games', 'Sports & Outdoors', 'Automotive', 'Books & Media']; // list of categories
    let storeFound = true; // flag for store found    
    const API_URL = 'http://127.0.0.1:8000/api/test/'

    // State: drop down values (store names)
    const [dropValues, setDropValues] = useState(["test"]);

    // State: button objects for store names
    const [buttons, setButtons] = useState([]);
    
    // State: input value for store names
    const [inputValue, setInputValue] = useState(''); // state for input value
    
    // State: json data from API fetch result
    const [data, setData] = useState(null);

    // State: error message from API fetch
    const [err, setErr] = useState(null);

    // State: products divs for displaying after button
    const [products, setProducts] = useState([]);

    // State: Store filtered products
    const [filteredProducts, setFilteredProducts] = useState([]);

    // State: Store filter string
    const [storeFilter, setStoreFilter] = useState("");

    const get_prices = async () => {
        try
        {
            const response = await axios.get('http://127.0.0.1:8000/api/test/get-stores/');
            let stores = response.data;
            console.log(stores);
            setDropValues(stores);
        }
        catch (err)
        {
            console.error(err);
        }
    }

    // EventHandler for filter change
    const handleFilterChange = (event) => {
        const store = event.target.value;
        setStoreFilter(store);

        if (store == "") {
            setFilteredProducts(products)
        } else {
            setFilteredProducts(products.filter(product => product.store === store))
        }
    }

    // Eventhandler for products change useState
    const handleAddProducts = () => {
        const newProducts = [
            { id: 1, title: "Laptop", price: 1200, image: null, store: "Target" },
            { id: 2, title: "Phone", price: 600, image: null, store: "Walmart" },
            { id: 3, title: "Desktop", price: 2000, image: null, store: "Walmart" },
            
            { id: 2, title: "Phone", price: 600, image: null, store: "Walmart" },
            { id: 3, title: "Desktop", price: 2000, image: null, store: "Walmart" },
            
            { id: 2, title: "Phone", price: 600, image: null, store: "Walmart" },
            { id: 3, title: "Desktop", price: 2000, image: null, store: "Walmart" },
            
            { id: 2, title: "Phone", price: 600, image: null, store: "Walmart" },
            { id: 3, title: "Desktop", price: 2000, image: null, store: "Walmart" },
            
            { id: 2, title: "Phone", price: 600, image: null, store: "Walmart" },
            { id: 3, title: "Desktop", price: 2000, image: null, store: "Walmart" },
        ];
        setProducts(newProducts);
    };

    // Fetch data from Django API
    const fetch_data = async () => {
        try {
            const response = await axios.get(API_URL)
            setData(response.data)
        } catch (err) {
            setErr(err.message)
        }
    };

    // Eventhandler for input value useState
    const handleInputChange = (event) => {
        setInputValue(event.target.value); // update input value
    }

    // Eventhandler for controlling submit behavior
    const handleSubmit = (event) => {
        event.preventDefault(); // prevent form submission
        handleClick();
    }

    // Eventhandler for product container click
    const handleProductClick = (product) => {
        console.log("Clicked: ", product.title);
        // alert(`You clicked on ${product.title}`);
    }

    // Eventhandler for returning valid stores matching input useState
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

    // Triggers every render
    useEffect(() => {
        // fetch_data(); 
        get_prices();
    }, []);

    return (
        <div>
            <h2>My Prices Tab</h2>
            <p>
                In the My Prices Tab, users can lock in up to 10 items they want to monitor for price changes. 
                PriceScout will continuously track these items, alerting users to any significant price drops or increases. 
                This personalized tracking feature ensures users never miss an opportunity to save.
            </p>

            {/* <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={5}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl> */}
            
            <h3>Product List (w/filter)</h3>
            <select onChange={handleFilterChange} value={storeFilter}>
                <option value="">Loading</option>
                
                {dropValues.map((value, index) => (
                    <option key={index} value={value.value}>
                        {value}
                    </option>
                ))}

            </select>

            
            {/* <div className="product-container">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <button onClick={() => handleProductClick(product)} key={product.id} className="product-card">
                            <img src={product.image} alt={product.title}/>
                            <h3>{product.title}</h3>
                            <p>Price: ${product.price}</p>
                            <p>Store: {product.store}</p>
                        </button>
                    ))
                    ) : (
                        <p>No products for this store</p>
                )}
            </div> */}

            {/* <button onClick={handleAddProducts}>Show Products</button>

            <h1>Test</h1>
            {data ? JSON.stringify(data) : err}
            
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

            {!storeFound && <p>No stores found</p>} */}
        </div>
    );
};

export default Prices;
