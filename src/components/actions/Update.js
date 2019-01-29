import React, { Component } from 'react';
import Client from './update/Client'
import Owner from './update/Owner'
import Email from './update/Email'


class Update extends Component {
  constructor() {
    super()
    this.state = {
      correntClient: null,
      style: { color: "rgb(252, 224, 65)" },
    }
  }
  getCorrntId = (id) => {
    let correntClient = this.props.data[id]
    correntClient.index = id
    this.setState({
      correntClient: correntClient
    })
  }
  getCorrntOwner = (id) => {
    let correntClient = this.state.correntClient
    correntClient.owner = this.props.data[id].owner
    this.setState({
      correntClient: correntClient
    })
  }
  getCorrntEmailType = (letter) => {
    let correntClient = this.state.correntClient
    correntClient.emailType = letter
    this.setState({
      correntClient: correntClient
    })
  }
  getCorrntSele = () => {
    let correntClient = this.state.correntClient
    correntClient.sold = true
    this.setState({
      correntClient: correntClient
    })
    this.sendUpdataData()
  }
  sendUpdataData = () => this.props.sendUpdataData(this.state.correntClient)

  render() {
    let correntClient = this.state.correntClient
    return (
      <div className="updata-client">
        {correntClient ? (
          <div className="updata-client-box">
            <h3>{`Hi ${correntClient.name} ${correntClient.surname} ,What would you like to change ?`}</h3>
            < Owner getCorrntOwner={this.getCorrntOwner} sendUpdataData={this.sendUpdataData} style={this.state.style} data={this.props.data} />
            < Email getCorrntEmailType={this.getCorrntEmailType} sendUpdataData={this.sendUpdataData} style={this.state.style} />
            <div className="client-actions"><span>Declare sele!</span><h4 id="declare" onClick={this.getCorrntSele} style={this.state.style}>DECLERE - But only if you're 100%sure</h4></div>
          </div>
        ) : null }
        {!correntClient ? (
          <div className="updata-first-box">
            <h2>Select a name and start updating</h2>
            < Client getCorrntId={this.getCorrntId} style={this.state.style} data={this.props.data} />
          </div>
        ) : null }
      </div>
    )
  }
}

export default Update