import React, { Component } from 'react';
import ReactDatalist from 'react-datalist'

class Client extends Component {
    setCurrentClient = (e) => {
        let id = e.split(" ")[2]
        this.props.getCorrntId(id)
    }
    render() {
        return (
            <div>
            <ReactDatalist list="all-clients"
                    onOptionSelected={this.setCurrentClient}
                    options={this.props.data.map((d, index) => { return `${d.name} ${d.surname} ${index}` })} />
            </div>
        )
    }
}
export default Client