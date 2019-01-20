import React, { Component } from 'react';
import ReactDatalist from 'react-datalist'

class Owner extends Component {
    state = {
        correntOwner: ""
    }
    setCurrentOwner = (e) => {
        let id = e.split(" ")[2]
        this.props.getCorrntOwner(id)
        this.setState({
            correntOwner: `${e.split(" ")[0]} ${e.split(" ")[1]}`
        })
    }
    resetOwner = () => {
        this.setState({
            correntOwner: ""
        })
    }
    sendUpdataData = () => this.props.sendUpdataData()

    render() {
        return (
            <div className="client-actions"> Transfer ownership To :
                {this.state.correntOwner ?
                    <span><span>{this.state.correntOwner}</span><button onClick={this.resetOwner}>back</button></span> :
                    <ReactDatalist list="fruit"
                        onOptionSelected={this.setCurrentOwner}
                        options={this.props.data.map((d, index) => { return `${d.owner} ${index}` })} />
                }
                <span onClick={this.sendUpdataData} style={this.props.style}>TRANSFER</span>
            </div>
        )
    }

}
export default Owner