import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
    { time: '2025-04-01', StoreA: 100, StoreB: 120 },
    { time: '2025-04-02', StoreA: 110, StoreB: 130 },
    { time: '2025-04-03', StoreA: 120, StoreB: 140 },
    { time: '2025-04-04', StoreA: 130, StoreB: 150 },
    { time: '2025-04-05', StoreA: 140, StoreB: 160 },
    { time: '2025-04-06', StoreA: 150, StoreB: 170 },
    { time: '2025-04-07', StoreA: 160, StoreB: 180 },
    { time: '2025-04-08', StoreA: 170, StoreB: 190 },
    { time: '2025-04-09', StoreA: 180, StoreB: 200 },
    { time: '2025-04-10', StoreA: 190, StoreB: 210 },
];

const PriceChart = () => {
    return (
        <div className="chart-container">
            <ResponsiveContainer width={'100%'} aspect={1.6}>
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid stroke="#666" strokeDasharray="3 3" />
                    <XAxis dataKey="time" domain={['auto', 'auto']} stroke="#fff"/>
                    <YAxis domain={['auto', 'auto']} stroke="#fff"/>
                    <Tooltip contentStyle={{ backgroundColor: '#222', borderColor: '#555', color: '#fff' }}/>
                    <Legend />
                    <Line type="monotone" dataKey="StoreA" stroke="#00d8ff" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="StoreB" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PriceChart;