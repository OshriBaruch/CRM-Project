import React, { Component } from 'react';
import TopEmployees from './recharts/TopEmployees'
import SalesBy from './recharts/SalesBy'
import SalesSince from './recharts/SalesSince'
import Acquisitions from './recharts/Acquisitions'

class Recharts extends Component {
    constructor() {
        super();
        this.state = { fild: "country" }
    }
    filterBy = (change) => {
        let fild = this.state.fild
        fild = change
        this.setState({ fild: fild });
    }
    render() {
        let recharts = this.props.recharts
        let fild = this.state.fild

        return <div className="recharts-analytics">
            <TopEmployees topEmployees={recharts.topEmployees} />
            <SalesBy salesBy={recharts.salesBy} fild={fild} filterBy={this.filterBy} />
            <SalesSince salesSince={recharts.salesSince} />
            <Acquisitions clientAcquisitions={recharts.clientAcquisitions} />
        </div>
    }
}

export default Recharts