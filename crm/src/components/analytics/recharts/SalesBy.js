import React, { Component } from 'react';

import { BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Bar } from 'recharts';

class SalesBy extends Component {
    render() {
        let salesBy = this.props.salesBy
        return (
            <BarChart width={800} height={200} data={salesBy}>
                <CartesianGrid strokeDasharray="7 7" />
                <XAxis dataKey="key" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
        )
    }
}

export default SalesBy