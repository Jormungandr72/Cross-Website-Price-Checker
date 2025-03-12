/*
-------------------------------------------------------------------------------
Program:    trends.js
Author:     Justin Clark
Date:       03/07/2025
Language:   javascript
Purpose:    trends page component
-------------------------------------------------------------------------------
Change Log:
Who  When           What
JC  03.07.2025     Created trends page component with graph and description
-------------------------------------------------------------------------------
*/

import { ReactComponent as Graph } from '../../images/graph.svg';

const Trends = () => {
    return(
        <div>
            <h2>Trends Tab</h2>
            <p>
                The Trends Tab highlights the top 10 most-searched items across the platform, 
                giving users insight into popular products and their best available prices from selected major retailers. 
                This section helps users discover trending deals and demonstrates the real-time functionality 
                of PriceScout’s price comparison tool.
            </p>

            <Graph style={ {width: '35%', height: 'auto' }}/>
        </div>
    );
};

export default Trends;