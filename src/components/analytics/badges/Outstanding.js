import React, { Component } from 'react';

class Outstanding extends Component {
  render() {
    return <div className="badges-box">
      <i className="fas fa-user-circle fa-6x"></i>
      <div className="badges-line">
        <h2 >{this.props.outstanding}</h2>
        <p>Outstanding Client</p>
      </div>
    </div>
  }
}
export default Outstanding