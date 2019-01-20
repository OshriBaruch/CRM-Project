import React, { Component } from 'react';

class NewClients extends Component {
  render() {
    return <div className="badges-box">
      <i className="fas fa-chart-line fa-6x"></i>
      <div className="badges-line">
      <h2>{this.props.newClients}</h2>
        <p>new client to month</p>
      </div>
    </div>
  }
}

export default NewClients