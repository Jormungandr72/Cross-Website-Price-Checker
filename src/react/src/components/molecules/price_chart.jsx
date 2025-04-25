import React from "react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const PriceChart = () => {

    const [data, setData] = useState([]);

    const getData = async () => {
        /* ===================================================== */
        /* CHANGE WHEN MOVING TO EC2 | CHANGE WHEN MOVING TO EC2 */
        /* ===================================================== */

        const url = 'http://localhost:8000/api/test/graph-data/';

        try {
            const response = await axios.post(url)
            return response.data;
        } catch (error) {
            console.error("Error in getData:", url, error);
            return null;
        }
        
    }

    const truncateLabel = (label) => {
        if (label.length > 10) {
            return label.substring(0, 10) + "...";
        }
        else {
            return label;
        }
    };

    useEffect(() => {
        const fetchAndFormatSampleData = async () => {
            try {
                const responseData = await getData();

                /* Check if the responseData is empty or undefined */
                if (!responseData || responseData.length === 0) {
                    console.error("No data received from the API.");
                    return;
                }

                const formattedData = responseData.map((item) => {
                    const name = truncateLabel(item.product_name);
                    const price = parseFloat(item.price);

                    return {
                        name: name,
                        "price": price
                    };
                })

                setData(formattedData);
            } catch (error) {
                console.error("Error fetching or formatting data:", error);
            }
        }

        fetchAndFormatSampleData();
    }, []);

    useEffect(() => {
    }, [data])

    return (
        <div className="chart-container">
            <ResponsiveContainer width={'100%'} aspect={1.6}>
                <LineChart
                    data={data.slice(0, 5)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid 
                        stroke="#666" 
                        strokeDasharray="3 3" 
                    />
                    <XAxis
                        dataKey="name"
                        domain={['auto', 'auto']}
                        stroke="#fff"
                        label={
                            {
                                value: 'Name',
                                position: 'insideMiddle',
                                offset: 0,
                                fill: '#fff'
                            }
                        }
                    />
                    <YAxis 
                        domain={['auto', 'auto']} 
                        stroke="#fff"
                        label={
                            {
                                value: 'Price',
                                angle: -90,
                                position: 'insideLeft',
                                offset: 0,
                                fill: '#fff'
                            }
                        }
                    />
                    <Tooltip 
                        contentStyle={
                            {
                                backgroundColor: '#222',
                                borderColor: '#555',
                                color: '#fff'
                            }
                        }
                    />
                    <Legend />
                    <Line type="monotone" dataKey="price" stroke="#00d8ff" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="name" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PriceChart;