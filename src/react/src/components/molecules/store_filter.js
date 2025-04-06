/*
-------------------------------------------------------------------------------
Program:    store_filter.js
Author:     Justin Clark
Date:       2025-04-04
Language:   JavaScript
Purpose:    This component is a filter for stores that allows users to select multiple stores and view the products available in those stores.
-------------------------------------------------------------------------------
Change Log:
Who  When           What
JC   2025-04-04     Created the store filter component
JC   2025-04-05     Added functionality to handle multiple selections and display selected values
-------------------------------------------------------------------------------
*/

import { useState, useEffect } from 'react';
import axios from 'axios';

import DropDown from '../molecules/dropdown.js';

const StoreFilter = () => {
    const API_URL = 'http://127.0.0.1:8000/api/test/';

    const [stores, setStores] = useState([]);
    const [storeFilters, setStoreFilters] = useState([]);
    const [products, setProducts] = useState([]);

    const get_stores = () => {
        try
        {
            axios.post(API_URL + 'get-stores/', {
                    headers: {
                        "Content-Type" : "application/json; charset=UTF-8"
                    }
                }
            )
            .then((data => {
                console.log(data.data)
                setStores(data.data);
            }))
            .catch((error) => {
                console.error(error);
            })
        }
        catch (err)
        {
            console.error(err);
        }
    }

    const get_products = (store = null) => {
        // try {
        //     axios.get(API_URL + (store ? `get-products?store_id=${store}` : "get-products"))
        //         .then((response) => {
        //             setProducts(response.data);
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //         })
        // } catch (err) {
        //     console.error(err);
        // }

        const PRODUCTS = [
            { id: 1, name: 'Product A', price: 10.00 },
            { id: 2, name: 'Product B', price: 20.00 },
            { id: 3, name: 'Product C', price: 30.00 },
            { id: 4, name: 'Product D', price: 40.00 },
            { id: 5, name: 'Product E', price: 50.00 },
            { id: 6, name: 'Product F', price: 60.00 },
            { id: 7, name: 'Product G', price: 70.00 },
            { id: 8, name: 'Product H', price: 80.00 },
            { id: 9, name: 'Product I', price: 90.00 },
            { id: 10, name: 'Product J', price: 100.00 },
            { id: 11, name: 'Product K', price: 110.00 },
            { id: 12, name: 'Product L', price: 120.00 },
        ]

        setProducts(PRODUCTS);
    }

    // EventHandler for filter change
    const handleFilterChange = (event) => {
        setStoreFilters(event.target.value);

        // Send filters to API with JSON payload
        // set the setStores to the response from the API
    }

    // Triggers once every mount
    useEffect(() => {
        get_stores();
        get_products();
    }, []);

    return (
        <div>
             <DropDown
                storeFilters={storeFilters}
                stores={stores}
                handleFilterChange={handleFilterChange}
            />

            <h2>Products</h2>
            <ul className="product-list">
                {products.map((product) => (
                    <div>
                        <img src={product.img} alt="product-img" />
                        <li key={product.id}>{product.name} | ${product.price}</li>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default StoreFilter;
