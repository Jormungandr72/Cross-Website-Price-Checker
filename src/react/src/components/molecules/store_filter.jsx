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

    const [loading, setLoading] = useState(false);

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

    const handleProductSearchChange = (newValue, event) => {
        // const searchQuery = newValue.target.textContent || event.target.value;
        const searchQuery = (newValue.target.textContent || event.target.value) || '';

        console.log("Search Query: ", searchQuery);

        if (searchQuery === '') {
            setTableData([ { title: "-", price: 0, source: "Select Product", link: "-" } ]);
            return;
        }

        setProductsFilter(searchQuery);
        setLoading(true);

        if (searchQuery.trim() !== '') {
            setProductsFilter(searchQuery);

            axios.post('http://localhost:8000/api/serp/sample/', { query: searchQuery.trim() })
                .then((response) => {
                    console.log(response.data);
                    setTableData(response.data);
                    setFilteredTableData(response.data);
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }

    const handleKeyDown = (event) => {
        // Check if the 'Enter' key is pressed
        if (event.key === 'Enter') {
            const query = event.target.value;

            console.log("Query: ", query)

            if (query.trim() === '') {
                setTableData([ { title: "-", price: 0, source: "Select Product", link: "-" } ]);
                return;
            }

            // Call the search change function when enter is pressed
            setProductsFilter(query);
            setLoading(true);

            axios.post('http://localhost:8000/api/serp/sample/', { query: query.trim() })
                .then((response) => {
                    console.log(response.data);
                    setTableData(response.data);
                    setFilteredTableData(response.data); // Reset filtered data
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    };

    // useEffect(() => {
    //     console.table(filteredStores);
    // }, [filteredStores]);

    useEffect(() => {
        console.log("Tabkle Data: ", tableData);
    }, [filteredTableData])

    useEffect(() => {
        setProducts(["Laptop", "Iphone", "Xbox"])

        const uniqueStores = Array.from(new Set(filteredTableData.map(item => item.source)))
        const get_stores = () => {
            // setStores(sample_stores.map(store => store.store ));
            setStores(uniqueStores);
        }

        get_stores();

        return;
    }, [filteredTableData]);

    return (
        <div>
            {/* PRODUCTS */}
            <div>
                <h2>Select Products</h2>
                <Autocomplete
                    freeSolo
                    options={products}
                    // getOptionLabel={
                    //     (option) => {
                    //         if (!option) return '';
                    //         return `${option}`
                    //     }
                    // }
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label="Select a product" variant="outlined" onKeyDown={handleKeyDown} />}
                    onChange={handleProductSearchChange}
                    onInputChange={handleProductSearchChange}
                    // isOptionEqualToValue={(option, value) => option == value}

                    sx={{width: "500px", margin: "auto"}}
                />
            </div>

            {/* STORES */}
            <div className='stores-select'>
                <Autocomplete
                    disabled={tableData[0].source === "Select Product"}
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

            <div>
                <TableContainer
                    component={Paper}
                    sx={{
                        backgroundColor: '#424242',
                        borderRadius: 2,
                        boxShadow: 3,
                        overflow: 'hidden'
                    }}
                >
                    <Table sx={{ minWidth: 650 }} aria-label="store table">
                        <TableHead>
                        <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Number</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Store</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Price ($)</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell>
                                        <p>loading...</p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                            filteredTableData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{row.source}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                </TableRow>
                            )))}
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
