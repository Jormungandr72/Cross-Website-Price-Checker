import { useState, useEffect, React } from 'react';
import axios from 'axios';

import PriceChart from '../molecules/price_chart';
import DropDownSingle from '../molecules/dropdown_single';

// Custom logging logic
import { debugLog } from '../../../debug'
import { DEBUG } from '../../../config';

const Trends = () => {
    const [selectedValue, setSelectedValue] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [filteredGraphData, setFilteredGraphData] = useState([]);

    const [storeFilters, setStoreFilters] = useState([])
    const [stores, setStores] = useState([])
    const [storeNames, setStoreNames] = useState([])

    // const API_URL = DEBUG.DEV ? 'http://localhost:8000/api/test/' : '/api/test/';

    const API_URL = 'http://localhost:8000/api/test/';

    const get_stores = () => {
        axios.post(API_URL + 'get-stores/')
            .then((data => {
                setStores(data.data);
            }))
            .catch((error) => {
                debugLog('Error while fetching get-stores/ for axios: ', error, 'error')
            })
    }

    const get_graph_data = () => {
        axios.post(API_URL + 'graph-data/')
            .then((data => {
                setGraphData(data.data);
            }))
            .catch((error) => {
                debugLog('Error while fetching graph-data/ for axios: ', error, 'error')
            })
    }

    const filterGraphData = (data, option) => {
        if (!data) return [];

        if (option === 'all') {
            setFilteredGraphData(data);
        } else {
            debugLog(`Data | Options:${option}`, data)
            const filtered = data.filter(item => item.category === option);
            setFilteredGraphData(filtered);
        }
    }

    const handleFilterChange = (event) => {
        const selectedIds = event.target.value;
        setStoreFilters(selectedIds);
        const selectedStoreNames = stores
            .filter(store => selectedIds.includes(store.store_id))
            .map(store => store.store_name);

        setStoreNames(selectedStoreNames);

        setSelectedValue(event);
        filterGraphData(graphData, event);
    }

    // Fetch data when component mounts, once
    useEffect(() => {
        get_stores();
        get_graph_data();
    }, []);

    return (
        <div>
            <h1>Price Trends</h1>
            <PriceChart 
                graphData={graphData}
            />

            <div className="selector">
                <h2>Select Store</h2>

                <DropDownSingle 
                    storeFilters={storeFilters}
                    stores={stores}
                    handleFilterChange={handleFilterChange}
                />
            </div>
        </div>
    )
}

export default Trends;
