import React, { Component } from 'react';

class InputComp extends Component {

    handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        this.props.filterBy({ name: name, value : value});
    }

    render() {
        let filters = this.props.filters
        return <div className="client-input">
            <input type="text" value={filters.input} name="input" onChange={this.handleInputChange} />
            <select value={filters.fild} name={"fild"} onChange={this.handleInputChange}>
                <option value="name">name</option>
                <option value="surname">sername</option>
                <option value="emailType">email</option>
                <option value="sold">sold</option>
                <option value="owner">owner</option>
                <option value="country">country</option>
            </select>
            <span className="fas fa-backward" onClick={this.props.movePreviousPage}></span>
            <span>{this.props.correctPage} / {Math.floor(this.props.dataLength)}</span>
            <span className="fas fa-forward" onClick={this.props.moveNextPage}></span>
        </div>
    }
}

export default InputComp