import React, { Component } from 'react';

import { BarChart, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Bar } from 'recharts';

class SalesBy extends Component {
    handleInputChange = (e) => {
        const value = e.target.value;
        this.props.filterBy(value);
    }
    render() {
        let fild = this.props.fild
        let data = this.props.salesBy[fild]
        return (
            <div className="salesBy-rechart">
                <div className="salesBy-select"><span>sales by : </span>
                <select value={fild} onChange={this.handleInputChange}>
                        <option value="email">email</option>
                        <option value="month">month</option>
                        <option value="owner">owner</option>
                        <option value="country">country</option>
                    </select>
                </div>
                <div className="SalesBy">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="7 7" />
                            <XAxis dataKey="key" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#FFD447" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )
    }
}

export default SalesBy