import React, { Component } from 'react';

class EmailSent extends Component {
  render() {
    return (
      <div className="badges-box">
        <i className="fas fa-envelope fa-6x"></i>
        <div className="badges-line">
          <h2 >{this.props.emailSent}</h2>
          <p>Email Sent</p>
        </div>
      </div>
    )
  }
}

export default EmailSent

