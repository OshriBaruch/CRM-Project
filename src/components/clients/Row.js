import React, { Component } from 'react';
import moment from 'moment'

class Row extends Component {
    setClientChange = () => this.props.setClientChange(this.props.client,this.props.index)
    render() {
        let client = this.props.client
        return (
        <div>
            <div className="client-row" onClick={this.setClientChange}>
                <span>{client.name}</span>
                <span>{client.surname}</span>
                <span>{client.country}</span>
                <span>{moment(client.firstContact).format('L')}</span>
                <span>{client.emailType}</span>
                <span className={client.sold ? "fas fa-check" : "fas fa-times"}></span>
                <span>{client.owner}</span>
            </div>
            <hr></hr>
        </div>
        )
    }
}

export default Row
