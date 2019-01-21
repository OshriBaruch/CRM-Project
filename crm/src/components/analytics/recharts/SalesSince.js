import React, { Component } from 'react';

import { LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line } from 'recharts';

class SalesSince extends Component {

    render() {
        let salesSince = this.props.salesSince
        return (
            <LineChart width={800} height={200} data={salesSince} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="key" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
            </LineChart>
        )
    }
}

export default SalesSince