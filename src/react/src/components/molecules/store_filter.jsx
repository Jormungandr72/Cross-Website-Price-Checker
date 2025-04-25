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

import DropDown from './dropdown.jsx';
import SearchBox from './searchbox.jsx'
import PriceAccordion from './price_accordion.jsx';

const StoreFilter = () => {
    /* ===================================================== */
    /* CHANGE WHEN MOVING TO EC2 | CHANGE WHEN MOVING TO EC2 */
    /* ===================================================== */
    const API_URL = 'http://localhost:8000/api/test/';

    const [stores, setStores] = useState([]);
    const [storeFilters, setStoreFilters] = useState([]);
    const [storeNames, setStoreNames] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setfilteredProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);

    const get_stores = () => {
        axios.post(API_URL + 'get-stores/')
            .then((data => {
                setStores(data.data);
            }))
            .catch((error) => {
                console.error(error);
            })
    }

    const get_products = () => {
        const payload = { 'store_names': storeNames }

        // console.log("Payload for get-products:", payload);

        try {
            axios.post(API_URL + 'get-products/', JSON.stringify(payload), {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            })
                .then((response) => {
                    // console.log("\nResponse data from get-products", response.data, '\n');

                    // Check if the response contains an error
                    if (response.data.error) {
                        console.log("No products found for the selected store.");
                        setProducts([]);
                        return;
                    }

                    // const productNames = response.data.map((product) => product.product_name);
                    setProducts(response.data);
                    // console.log("Product names:", productNames);
                })
                .catch((error) => {
                    console.error(error);
                })
        } catch (err) {
            console.error(err);
        }
    }

    // EventHandler for filter change
    const handleSearchChange = (newValue) => {
        setSearchTerm(newValue)
        console.log("Search term in parent:", newValue);
    }

    // EventHandler for filter change
    const handleFilterChange = (event) => {
        const selectedIds = event.target.value;
        setStoreFilters(selectedIds);
        // console.log("Selected store IDs:", selectedIds);
        
        // get store names
        const selectedStoreNames = stores
            .filter(store => selectedIds.includes(store.store_id))
            .map(store => store.store_name);

        // console.log("Selected store IDs:", selectedIds);
        // console.log("Selected store names:", selectedStoreNames);

        setStoreNames(selectedStoreNames);
    }

    const toggleSelectProduct = (product) => {
        const selected = selectedProducts.find(p => p.id == product.id)

        if (selected) {
            setSelectedProducts(prev => prev.filter(p => p.id !== product.id))
        }  else if (selectedProducts.length < 2) {
            setSelectedProducts(prev => [...prev, product]);
        } else {
            alert("You can only compare 2 products at a time!");
        }
    }

    useEffect(() => {
        get_stores();
    }, []);

    // Triggers once every component mount
    useEffect(() => {
        if (storeNames.length > 0) {
            get_products();
        }
        else {
            setProducts([]);
            setSelectedProducts([])
        }
    }, [storeNames]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const filtered = products.filter((product) => {
                return product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
            });
            setfilteredProducts(filtered)
        }, 450);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm, products]);
    
    return (
        <div>
            <SearchBox onSearchChange={handleSearchChange} />
            <DropDown
                storeFilters={storeFilters}
                stores={stores}
                handleFilterChange={handleFilterChange}
            />

            <h2>Comparison</h2>

            {selectedProducts.length > 0 && (
                <div className="comparison-panel">
                    <h3>Compare Products</h3>
                    <div className="comparison-items">
                        {selectedProducts.map((product) => (
                            <div key={product.id} className="comparison-card">
                                <h4>{product.product_name}</h4>
                                <img src={product.img_url} alt="product-img" />
                                <p>Price: ${product.price}</p>
                                <p>{product.product_description}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setSelectedProducts([])}>Clear Comparison</button>
                </div>
            )}

            <h2>Products</h2>
            <ul className="product-list">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id} 
                        onClick={() => toggleSelectProduct(product)} 
                        className={
                            `product-card ${selectedProducts.find(p => p.id === product.id) ? 'selected' : ''}`
                        }
                    >
                        <img src={product.img_url} alt="product-img" />
                        {/* <PriceAccordion
                            title={product.product_name} 
                            price={product.price ? product.price : 0}
                            children={product.product_description}
                        /> */}
                        <li>{`${product.product_name} $${product.price}`}</li>
                    </div>
                ))}

            </ul>
        </div>
    );
};

export default StoreFilter;

