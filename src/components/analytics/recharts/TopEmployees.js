import React, { Component } from 'react';

import { XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, Bar, ResponsiveContainer } from 'recharts';

class TopEmployees extends Component {
    render() {
        let topEmployees = this.props.topEmployees
        return (
            <div className="topEmployees">
                <div className="topEmployees-title">Top Employees</div>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart layout="vertical"
                        data={topEmployees} margin={{ top: 5, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid stroke='#f5f5f5' />
                        <XAxis type="number" />
                        <YAxis dataKey="key" type="category" />
                        <Tooltip />
                        <Bar dataKey="value" barSize={20} fill='#FFD447' />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
export default TopEmployees
