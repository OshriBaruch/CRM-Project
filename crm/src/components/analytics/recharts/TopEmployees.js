import React, { Component } from 'react';

import { BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Bar } from 'recharts';

class TopEmployees extends Component {
    render() {
        let topEmployees = this.props.topEmployees
        return (
            <BarChart width={300} height={200} data={topEmployees}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="key" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        )
    }
}

export default TopEmployees