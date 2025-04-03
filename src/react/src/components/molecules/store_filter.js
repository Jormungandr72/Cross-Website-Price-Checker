import { useState, useEffect } from 'react';
import axios from 'axios';

const StoreFilter = () => {
    const API_URL = 'http://127.0.0.1:8000/api/test/'

    // State: drop down values (store names)
    const [stores, setStores] = useState(["test"]);

    // State: products divs for displaying after button
    const [products, setProducts] = useState([]);

    // State: Store filter string
    const [storeFilter, setStoreFilter] = useState("");

    const get_stores = async () => {
        try
        {
            axios.get(API_URL + 'get-stores/')
                .then((response) =>{
                    setStores(response.data['stores']);
                })
                .catch((error) => {
                    console.error('Error fetching stores:', error);
                });
        }
        catch (err)
        {
            console.error(err);
        }
    }

    const get_products = (store = null) => {
        try {
            axios.get(API_URL + (store ? `/get-products?store_id=${store}` : "/get-products"))
                .then((response) => {
                    setProducts(response.data);
                })
        } catch (err) {
            console.error(err);
        }
    }

    // EventHandler for filter change
    const handleFilterChange = (event) => {
        const store = event.target.value;
        setStoreFilter(store);

        axios.get(`${API_URL}get-products?store_id=${store}/`)
            .then((response) => {
                setProducts(response.data['products']);
            });
    }

    // Triggers every render
    useEffect(() => {
        get_stores();
        get_products();
    }, []);

    return (
        <div>
            <div className="input-container">
                <h3>Store Filter</h3>
                <select onChange={handleFilterChange} value={storeFilter}>
                    <option value="">Loading</option>
                    
                    {stores.map((value, index) => (
                        <option key={index} value={value}>
                            {value.name}
                        </option>
                    ))}

                </select>
            </div>

            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name} | ${product.price}</li>
                ))};
            </ul>
        </div>
    );
};

export default StoreFilter;