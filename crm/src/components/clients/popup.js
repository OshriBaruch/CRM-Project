import React, { Component } from 'react';

class Popup extends Component {
  constructor(props) {
    super(props);
    // this.state = { name: props.client.name || "" , surname: "", country: "", email: "" }
    this.state = { name: "", surname: "", country: "", email: "" }
  }

  handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({ [name]: value });
  }

  savePopupChange = () => this.props.savePopupChange(this.state)

  render() {
    let client = this.props.client

    return (
      <div id="popup-container">
        <div id="popup-content">
          <div className="popup-titel"><h3>Updata Client Data</h3><span id="popup-close" onClick={this.props.closePopUp} >&times;</span></div>
          <div><span>Name : </span><input type="text" value={this.state.name ? this.state.name : client.name} name="name" onChange={this.handleInputChange} /></div>
          <div><span>Sername : </span><input type="text" value={this.state.surname ? this.state.surname : client.surname} name="surname" onChange={this.handleInputChange} /></div>
          <div><span>Email : </span><input type="text" value={this.state.email ? this.state.email : client.email} name="email" onChange={this.handleInputChange} /></div>
          <div><span>Country :</span> <input type="text" value={this.state.country ? this.state.country : client.country} name="country" onChange={this.handleInputChange} /></div>
          <div><span className="far fa-share-square" onClick={this.savePopupChange} ></span></div>
        </div>
      </div>
    )
  }
}
export default Popup