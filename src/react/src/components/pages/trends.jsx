import React from 'react';

import PriceChart from '../molecules/price_chart';
import TrendsDropDown from '../molecules/trends_dropdown';

const Trends = () => {
    return (
        <div>
            <h1>Price Trends</h1>
            <PriceChart />

            <div className="selector">
                <h2>Select Store</h2>
                
                <TrendsDropDown />
            </div>
        </div>
    )
}

export default Trends;
