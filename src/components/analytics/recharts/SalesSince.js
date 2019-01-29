import React, { Component } from 'react';

import { LineChart, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Line } from 'recharts';

class SalesSince extends Component {

    render() {
        let salesSince = this.props.salesSince
        return (
            <div className="salesSince">
                <div className="salesSince-title">Sales Since</div>
                <div>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={salesSince} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="key" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#FFD447" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )
    }
}

export default SalesSince