import React, { Component } from 'react';

import { BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Bar } from 'recharts';

class SalesBy extends Component {
    handleInputChange = (e) => {
        const value = e.target.value;
        this.props.filterBy(value);
    }
    render() {
        let fild = this.props.fild
        let data = this.props.salesBy[fild]
        return (
            <div>
                <select value={fild} onChange={this.handleInputChange}>
                    <option value="email">email</option>
                    <option value="month">month</option>
                    <option value="owner">owner</option>
                    <option value="country">country</option>
                </select>
                <BarChart width={800} height={200} data={data}>
                    <CartesianGrid strokeDasharray="7 7" />
                    <XAxis dataKey="key" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
            </div>
        )
    }
}

export default SalesBy