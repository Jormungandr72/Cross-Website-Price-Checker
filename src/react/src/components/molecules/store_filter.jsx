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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';

import { debugLog } from '../../../debug'
import { DEBUG } from '../../../config'

const StoreFilter = () => {
    const API_URL = DEBUG.DEV ? '/api/test/' : 'http://localhost:8000/api/test/';

    const [stores, setStores] = useState([]);
    const [filteredStores, setFilteredStores] = useState([]);

    const [products, setProducts] = useState([]);
    const [productsFilter, setProductsFilter] = useState([])

    const [tableData, setTableData] = useState([ { title: "-", price: 0, source: "Select Product", link: "-" } ]);
    const [filteredTableData, setFilteredTableData] = useState([]);

    const sample_stores = [
        { store: "Best Buy" },
        { store: "Walmart" },
        { store: "Microcenter" },
        { store: "Walmart" },
        { store: "Dell" },
        { store: "Amazon" },
        { store: "Staples" },
        { store: "Walmart" },
    ];

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
        const searchTerm = newValue.target.textContent;
        
        if (searchTerm == '') {
            setFilteredTableData(tableData)
        } else {
            const filtered = tableData.filter(store => searchTerm.includes(store.source));
            setFilteredTableData(filtered);
        }
    };

    const handleProductSearchChange = (newValue) => {
        if (newValue.target.textContent === '') {
            setTableData([ { title: "-", price: 0, source: "Select Product", link: "-" } ]);
            return;
        }

        // const searchTerm = newValue.target.textContent;
        // const filtered = stores.filter(store => store.includes(searchTerm));

        setProductsFilter(newValue.target.textContent);

        // get realtime data
        axios.post(
            'http://localhost:8000/api/serp/sample/',
            {
                'query': newValue.target.textContent
            })
            .then((response) => {
                console.log(response.data);
                setTableData(response.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // useEffect(() => {
    //     console.table(filteredStores);
    // }, [filteredStores]);

    useEffect(() => {
        console.log("Tabkle Data: ", tableData);
    }, [filteredTableData])

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

        setProducts(["Laptop", "Iphone", "Xbox"])

        // const get_stores = () => {
        //     axios.get('http://localhost:8000/api/serp/sample/')
        //         .then((response) => {
        //             const merged = [
        //                 ...sample_stores.map(store => ( store.store )),
        //                 response.data.store
        //             ];
        //             setStores(merged);
        //         })
        //         .catch((error) => {
        //             debugLog(error, [], 'error');
        //         })
        // };

        const get_stores = () => {
            setStores(sample_stores.map(store => store.store ));
        }

        get_stores();

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
                <h2>Select Products</h2>
                <Autocomplete
                    options={products}
                    getOptionLabel={
                        (option) => {
                            if (!option) return '';
                            return `${option}`
                        }
                    }
                    renderInput={(params) => <TextField {...params} label="Select a product" variant="outlined" />}
                    onChange={handleProductSearchChange}
                    isOptionEqualToValue={(option, value) => option == value}

                    sx={{width: "500px", margin: "auto"}}
                />
            </div>
            <div className='product-select'>
                <Autocomplete
                    options={stores}
                    getOptionLabel={
                        (option) => {
                            if (!option) return '';
                            return `${option}`
                        }
                    }
                    renderInput={(params) => <TextField {...params} label="Select Store(s)" variant="outlined" />}
                    onChange={handleSearchChange}
                    isOptionEqualToValue={(option, value) => option == value}

                    sx={{width: "500px", margin: "auto"}}
                />
            </div>
            
            {/* <div className='product-display'>
                <h2>Products</h2>
                <div className='product-grid'>
                    {products.map((product, index) => (
                        <div key={product.id} className='product-card'>
                            <h3>Name: {product}</h3>
                        </div>
                    ))}
                </div>
            </div> */}

            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="store table">
                        <TableHead>
                        <TableRow>
                        <TableCell>Number</TableCell>
                        <TableCell>Store</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Price ($)</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTableData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{row.source}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
                {/* <h2>Products</h2> */}
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
                {/* <h2>Comparison</h2> */}

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
