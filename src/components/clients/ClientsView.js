import React, { Component } from 'react';

class ClientsView extends Component {

    handleInputChange = (e) => {
        const value = e.target.value;
		console.log("TCL: ClientsView -> handleInputChange -> value", value)
        const name = e.target.name;
		console.log("TCL: ClientsView -> handleInputChange -> name", name)
        this.props.filterByUserFild({ name: name, value: value });
    }

    render() {
        let filters = this.props.filters
		console.log("TCL: ClientsView -> render -> filters", filters)
        return (
            <div id="client-search">
                <div className="filter-client">
                    <input type="text" value={filters.input} name="input" onChange={this.handleInputChange} />
                    <select value={filters.fild} onChange={this.handleInputChange}>
                        <option value="name">name</option>
                        <option value="surname">sername</option>
                        <option value="emailType">email</option>
                        <option value="sold">sold</option>
                        <option value="owner">owner</option>
                        <option value="country">country</option>
                    </select>
                </div>
                <div className="move-page-icons">
                    <span className="fas fa-backward" onClick={this.props.movePreviousPage}></span>
                    <span>{this.props.correntPage} / {Math.floor(this.props.dataLength)}</span>
                    <span className="fas fa-forward" onClick={this.props.moveNextPage}></span>
                </div>
            </div>
        )
    }
}

export default ClientsView