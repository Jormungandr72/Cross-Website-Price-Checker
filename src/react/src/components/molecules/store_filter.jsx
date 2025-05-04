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
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { Autocomplete, TextField } from '@mui/material';

import { debugLog } from '../../../debug'
import { DEBUG } from '../../../config'

const StoreFilter = () => {
    const API_URL = DEBUG.DEV ? '/api/test/' : 'http://localhost:8000/api/test/';

    const [stores, setStores] = useState([]);
    const [filteredStores, setFilteredStores] = useState([]);

    // const sample_stores = [
    //     { "store": "Newegg" },
    //     { "store": "Amazon" },
    //     { "store": "Best Buy" },
    //     { "store": "B&H Photo Video" },
    //     { "store": "TigerDirect" },
    //     { "store": "Central Computer" },
    //     { "store": "OutletPC" },
    //     { "store": "SuperBiiz" },
    //     { "store": "Directron" }
    // ];

    const sample_stores = [
        { store: "Newegg", name: "Desktop", price: 1800, image: "https://example.com/desktop.jpg" },
        { store: "Amazon", name: "Laptop", price: 1500, image: "https://example.com/laptop.jpg" },
        { store: "Best Buy", name: "Headphones", price: 150, image: "https://example.com/headphones.jpg" },
        { store: "B&H Photo Video", name: "Macbook", price: 2400, image: "https://example.com/macbook.jpg" },
        { store: "TigerDirect", name: "Monitor", price: 300, image: "https://example.com/monitor.jpg" },
        { store: "Central Computer", name: "Desktop", price: 1800, image: "https://example.com/desktop.jpg" },
        { store: "OutletPC", name: "Macbook", price: 2400, image: "https://example.com/macbook.jpg" },
        { store: "SuperBiiz", name: "Laptop", price: 1500, image: "https://example.com/laptop.jpg" },
        { store: "Directron", name: "Headphones", price: 150, image: "https://example.com/headphones.jpg" }
    ]

    // const [stores, setStores] = useState([]);
    // const [storeFilters, setStoreFilters] = useState([]);
    // const [storeNames, setStoreNames] = useState([]);
    // const [products, setProducts] = useState([]);
    // const [filteredProducts, setfilteredProducts] = useState([])
    // const [searchTerm, setSearchTerm] = useState('');
    // const [selectedProductIds, setSelectedProductIds] = useState([]);

    // const get_stores = () => {
    //     axios.post(API_URL + 'get-stores/')
    //         .then((data => {
    //             setStores(data.data);
    //         }))
    //         .catch((error) => {
    //             debugLog('Error fetching data for get-stores/', error, 'error')
    //         })
    // }

    // const get_products = () => {
    //     const payload = { 'store_names': storeNames }

    //     try {
    //         axios.post(API_URL + 'get-products/', JSON.stringify(payload), {
    //             headers: {
    //                 "Content-Type": "application/json; charset=UTF-8"
    //             }
    //         })
    //             .then((response) => {
    //                 // Check if the response contains an error
    //                 if (response.data.error) {
    //                     debugLog("No products found for the selected store", response.data.error, 'error')
    //                     setProducts([]);
    //                     return;
    //                 }
    //                 setProducts(response.data);
    //             })
    //             .catch((error) => {
    //                 debugLog('[Inner] Error fetching data for get-products/', error, 'error')
    //             })
    //     } catch (err) {
    //         debugLog('[Outer] Error fetching data for get-products/', err, 'error')
    //     }
    // }

    // EventHandler for filter change
    
    const handleSearchChange = (newValue) => {
        // setSearchTerm(newValue);
        console.log(typeof newValue);
        const searchTerm = newValue.toLowerCase();
        const filtered = stores.filter(store => {
            // console.log("Type of store in stores is: ", typeof store, " and store == ", store);
            return store.toLowerCase().includes(searchTerm);
        });

        setFilteredStores(filtered);
    };

    useEffect(() => {
        console.table(filteredStores);
    }, [filteredStores]);

    // EventHandler for filter change
    // const handleFilterChange = (event) => {
    //     const selectedIds = event.target.value;
    //     setStoreFilters(selectedIds);
        
    //     // get store names
    //     const selectedStoreNames = stores
    //         .filter(store => selectedIds.includes(store.store_id))
    //         .map(store => store.store_name);

    //     setStoreNames(selectedStoreNames);
    // }

    // const toggleSelectProduct = (productId) => {
    //     setSelectedProductIds(prev => {
    //         const isSelected = prev.includes(productId);

    //         if (isSelected) {
    //             return prev.filter(id => id !== productId);
    //         }

    //         if (prev.length >= 2) {
    //             alert("You can only compare 2 products at a time");
    //             return prev;
    //         }

    //         return [...prev, productId];
    //     });
    // };

    useEffect(() => {
        // get_stores();

        const serp = () => {
            axios.get('http://localhost:8000/api/serp/sample/')
                .then((response) => {
                    // const data = {
                    //     store: response.data.store,
                    //     name: response.data.name,
                    //     price: response.data.price,
                    //     img: response.data.image[0]
                    // }
                    
                    // console.table(data);

                    const merged = [
                        ...sample_stores.map(store => ( store.store )),
                        response.data.store
                    ];

                    setStores(merged);
                })
                .catch((error) => {
                    debugLog(error, [], 'error');
                })
        };

        serp();

        return;
    }, []);

    // Triggers once every component mount
    // useEffect(() => {
    //     if (storeNames.length > 0) {
    //         get_products();
    //     }
    //     else {
    //         setProducts([]);
    //         setSelectedProductIds([])
    //     }
    // }, [storeNames]);

    // useEffect(() => {
    //     const delayDebounce = setTimeout(() => {
    //         const filtered = products.filter((product) => {
    //             return product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    //         });
    //         setfilteredProducts(filtered)
    //     }, 450);

    //     return () => clearTimeout(delayDebounce);
    // }, [searchTerm, products]);
    
    return (
        <div>
            <div>
                <Autocomplete
                    options={stores}
                    getOptionLabel={(option) => `${option.store} - ${option.name}`}
                    renderInput={(params) => <TextField {...params} label="Select a Store" variant="outlined" />}
                    onChange={handleSearchChange}
                    isOptionEqualToValue={(option, value) => option.store === value.store && option.name === value.name}
                    
                    sx={{width: "500px", margin: "auto"}}
                />
            </div>

            <div>
                {/* <SearchBox onSearchChange={handleSearchChange} /> */}
                {/* <DropDown
                    storeFilters={storeFilters}
                    stores={stores}
                    handleFilterChange={handleFilterChange}
                /> */}

                {/* Stores display */}
                {/* <div>
                    <List dense>
                        {filteredStores.map((item, index) => (
                            <ListItem key={index} divider>
                            <ListItemText
                                primary={item}
                            />
                            </ListItem>
                        ))}
                    </List>
                </div> */}
            </div>

            <div>
                <h2>Products</h2>
                {/*<ul className="product-list">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id} 
                            onClick={() => toggleSelectProduct(product)} 
                            className={
                                `product-card ${selectedProductIds.find(p => p.id === product.id) ? 'selected' : ''}`
                            }
                        >
                            <img src={product.img_url} alt="product-img" />
                            {/* <PriceAccordion
                                title={product.product_name} 
                                price={product.price ? product.price : 0}
                                children={product.product_description}
                            /> */}{/*
                            <li>{`${product.product_name} $${product.price}`}</li>
                        </div>
                    ))}

                </ul> */}
            </div>

            <div>
                <h2>Comparison</h2>

                {/* Display comparison panel only if there are comparisons in the list */}
                {/* {selectedProductIds.length > 0 && (
                    <div className="comparison-panel">
                        <h3>Compare Products</h3>
                        <div className="comparison-items">
                            {selectedProductIds.map((product) => (
                                <div key={product.id} className="comparison-card">
                                    <h4>{product.product_name}</h4>
                                    <img src={product.img_url} alt="product-img" />
                                    <p>Price: ${product.price}</p>
                                    <p>{product.product_description}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setSelectedProductIds([])}>Clear Comparison</button>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default StoreFilter;
