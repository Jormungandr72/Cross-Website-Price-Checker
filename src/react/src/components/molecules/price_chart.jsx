import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
    { day: 'Monday', sales: 120, revenue: 500 },
    { day: 'Tuesday', sales: 98, revenue: 430 },
    { day: 'Wednesday', sales: 86, revenue: 400 },
    { day: 'Thursday', sales: 99, revenue: 450 },
    { day: 'Friday', sales: 85, revenue: 420 },
    { day: 'Saturday', sales: 105, revenue: 480 },
    { day: 'Sunday', sales: 110, revenue: 490 },
]

const PriceChart = () => {
    return (
        <div className="chart-container">
            <ResponsiveContainer width={'100%'} aspect={1.6}>
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid 
                        stroke="#666" 
                        strokeDasharray="3 3" 
                    />
                    <XAxis
                        dataKey="time"
                        domain={['auto', 'auto']}
                        stroke="#fff"
                        label={
                            {
                                value: 'Time',
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
                    <Line type="monotone" dataKey="sales" stroke="#00d8ff" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PriceChart;