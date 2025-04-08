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
    const [storeNames, setStoreNames] = useState([]);
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
        const payload = { 'store_names': storeNames }
        
        try {
            axios.post(API_URL + 'get-products/', payload)
                .then((response) => {
                    console.log("\nResponse data from get-products", response.data, '\n');

                    // Check if the response contains an error
                    if (response.data.error) {
                        console.log("No products found for the selected store.");
                        setProducts([]);
                        return;
                    }

                    const productNames = response.data.map((product) => product.product_name);
                    setProducts(response.data);
                    console.log("Product names:", productNames);
                })
                .catch((error) => {
                    console.error(error);
                })
        } catch (err) {
            console.error(err);
        }

        // Demo data for testing purposes
        // const PRODUCTS = [
        //     { id: 1, name: 'Product A', price: 10.00 },
        //     { id: 2, name: 'Product B', price: 20.00 },
        //     { id: 3, name: 'Product C', price: 30.00 },
        //     { id: 4, name: 'Product D', price: 40.00 },
        //     { id: 5, name: 'Product E', price: 50.00 },
        //     { id: 6, name: 'Product F', price: 60.00 },
        //     { id: 7, name: 'Product G', price: 70.00 },
        //     { id: 8, name: 'Product H', price: 80.00 },
        //     { id: 9, name: 'Product I', price: 90.00 },
        //     { id: 10, name: 'Product J', price: 100.00 },
        //     { id: 11, name: 'Product K', price: 110.00 },
        //     { id: 12, name: 'Product L', price: 120.00 },
        // ]

        // setProducts(PRODUCTS);
    }

    // EventHandler for filter change
    const handleFilterChange = (event) => {
        const selectedIds = event.target.value;
        setStoreFilters(selectedIds);

        // get store names
        const selectedStoreNames = stores
            .filter(store => selectedIds.includes(store.store_id))
            .map(store => store.store_name);

        console.log("Selected store IDs:", selectedIds);
        console.log("Selected store names:", selectedStoreNames);

        setStoreNames(selectedStoreNames);
    }

    // Triggers once every component mount
    useEffect(() => {
        get_stores();
        get_products(storeFilters);
    }, [storeFilters]);
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
                        <img src={product.img_url} alt="product-img" />
                        <li key={product.id}>{product.product_name} | ${product.price ? product.price : 0}</li>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default StoreFilter;

