import React, { Component } from 'react';
import moment from 'moment'

class AddClient extends Component {
  constructor() {
    super()
    this.state = { name: "", surname: "", email: "", country: "", owner: "" }
  }

  handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

  saveNewClient = async () => {
    let newClient = {
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      country: this.state.country,
      firstContact: moment().format(),
      owner: this.state.owner,
      emailType: null,
      sold: false
    }
    await this.props.saveNewClient(newClient)

    let emptystate = {name: "", surname: "", email: "", country: "", owner: "" }
    alert("New Client Saved!")

    this.setState(emptystate);
  }

  render() {
    let state = this.state
    return <div id="add-client">
      <h2>Add Client</h2>
      <div className="add-client"><span>First Name:</span>
        <input type="text" value={state.name} name="name" onChange={this.handleInputChange} />
      </div>
      <div className="add-client"><span>Surname :</span>
        <input type="text" value={state.email} name="surname" onChange={this.handleInputChange} />
      </div>
      <div className="add-client"><span>Send Email :</span>
        <input type="email" value={state.surname} name="email" onChange={this.handleInputChange} />
      </div>
      <div className="add-client"><span>Country :</span>
        <input type="text" value={state.country} name="country" onChange={this.handleInputChange} />
      </div>
      <div className="add-client"><span>Owner :</span>
        <input type="text" value={state.owner} name="owner" onChange={this.handleInputChange} />
      </div>
      <button className="sendNewComplain" onClick={this.saveNewClient}>Submit</button>
    </div>
  }
}

export default AddClient