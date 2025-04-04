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
    const API_URL = 'http://127.0.0.1:8000/api/test/'

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
        try {
            axios.get(API_URL + (store ? `get-products?store_id=${store}` : "get-products"))
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((error) => {
                    console.error(error);
                })
        } catch (err) {
            console.error(err);
        }
    }

    // EventHandler for filter change
    const handleFilterChange = (event) => {
        setStoreFilters(event.target.value);
    }

    // Triggers once every mount
    useEffect(() => {
        get_stores();
        // get_products();
    }, []);

    return (
        <div>
             <DropDown
                storeFilters={storeFilters}
                stores={stores}
                handleFilterChange={handleFilterChange}
            />

            <h2>Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name} | ${product.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default StoreFilter;
