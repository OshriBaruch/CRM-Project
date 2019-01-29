import React, { Component } from 'react';
import Update from './actions/Update'
import AddClient from './actions/AddClient'
import axios from 'axios'
import './actions/Actions.css';

class Actions extends Component {
  constructor() {
    super()
    this.state = { data: [] }
  }
  async componentDidMount() {
    const data = await axios.get('/clients')
		console.log('TCL: Actions -> componentDidMount -> data', data)
    this.setState({ data: data.data })
    this.props.getCorrntPage("Actions")
  }
  saveClientChangeToDB = async (client) => {
    let data = await axios.put('/client', client)
    return data.data
  }
  sendUpdataData = (obj) => {
    if (this.saveClientChangeToDB(obj)) {
      let data = this.state.data
      data[obj.index] = obj
      this.setState({ data: data })
      alert("The information is modified and saved in db")
    }
    else {
      alert("Not Found Data")
    }
  }
  saveNewClient = async (newClient) => {
    let data = await axios.post('/client', newClient)
    return data.data
  }
  render() {
    return (
      <div id="actions">
        {this.state.data.length > 0 ? <Update data={this.state.data} sendUpdataData={this.sendUpdataData} /> : null}
        {this.state.data.length > 0 ? <AddClient saveNewClient={this.saveNewClient} /> : null}
      </div>
    )
  }
}

export default Actions