import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
    { time: '2023-10-01', 'high-price': 100, 'low-price': 90, current: 95 },
    { time: '2023-10-02', 'high-price': 110, 'low-price': 85, current: 95 },
    { time: '2023-10-03', 'high-price': 120, 'low-price': 80, current: 95 },
    { time: '2023-10-04', 'high-price': 130, 'low-price': 75, current: 95 },
    { time: '2023-10-05', 'high-price': 140, 'low-price': 70, current: 95 },
    { time: '2023-10-06', 'high-price': 150, 'low-price': 65, current: 95 },
    { time: '2023-10-07', 'high-price': 160, 'low-price': 60, current: 95 },
    { time: '2023-10-08', 'high-price': 170, 'low-price': 55, current: 95 },
    { time: '2023-10-09', 'high-price': 180, 'low-price': 50, current: 95 },
    { time: '2023-10-10', 'high-price': 190, 'low-price': 45, current: 95 },
    { time: '2023-10-11', 'high-price': 200, 'low-price': 40, current: 95 },
    { time: '2023-10-12', 'high-price': 210, 'low-price': 35, current: 95 },
    { time: '2023-10-13', 'high-price': 220, 'low-price': 30, current: 95 },
    { time: '2023-10-14', 'high-price': 230, 'low-price': 25, current: 95 },
    { time: '2023-10-15', 'high-price': 240, 'low-price': 20, current: 95 },
    { time: '2023-10-16', 'high-price': 250, 'low-price': 15, current: 95 },
    { time: '2023-10-17', 'high-price': 260, 'low-price': 10, current: 95 },
    { time: '2023-10-18', 'high-price': 270, 'low-price': 5, current: 95 },
    { time: '2023-10-19', 'high-price': 280, 'low-price': 0, current: 95 },
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
                    <Line type="monotone" dataKey="high-price" stroke="#00d8ff" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="low-price" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PriceChart;