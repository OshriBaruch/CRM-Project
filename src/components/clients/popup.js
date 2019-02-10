import React, { Component } from 'react';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.client.name || "",
      surname: props.client.surname || "",
      country: props.client.country || "",
      email: props.client.email || ""
    }
  }

  handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({ [name]: value });
  }

  savePopupChange = () => this.props.savePopupChange(this.state)

  render() {

    return (
      <div id="popup-container">
        <div id="popup-content">
          <div className="popup-titel">
            <h3>Updata Client Data</h3><span id="popup-close" onClick={this.props.closePopUp} >&times;</span>
          </div>
          <div><span>Name : </span>
            <input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} />
          </div>
          <div><span>Sername : </span>
            <input type="text" value={this.state.surname} name="surname" onChange={this.handleInputChange} />
          </div>
          <div><span>Email : </span>
            <input type="text" value={this.state.email} name="email" onChange={this.handleInputChange} />
          </div>
          <div><span>Country :</span>
            <input type="text" value={this.state.country} name="country" onChange={this.handleInputChange} />
          </div>
          <div><span className="far fa-share-square" onClick={this.savePopupChange} ></span>
          </div>
        </div>
      </div>
    )
  }
}
export default Popup