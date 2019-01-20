import React, { Component } from 'react';
import TopEmployees from './recharts/TopEmployees'
import SalesBy from './recharts/SalesBy'
import SalesSince from './recharts/SalesSince'
import Acquisitions from './recharts/Acquisitions'

class Recharts extends Component {
    render() {
        let recharts = this.props.recharts

        return <div className="recharts-analytics">
            <TopEmployees topEmployees={recharts.topEmployees}/>
            <SalesBy salesBy={recharts.salesBy}/>
            <Acquisitions clientAcquisitions={recharts.clientAcquisitions}/>
            <SalesSince salesSince={recharts.salesSince}/>
        </div>
    }
}

export default Recharts