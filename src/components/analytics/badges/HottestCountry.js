import React, { Component } from 'react';

class HottestCountry extends Component {
  render() {
    return (
      <div className="badges-box">
        <i className="fas fa-globe-americas fa-6x"></i>
        <div className="badges-line">
          <h2 >{this.props.hottestCountry.key}</h2>
          <p>Hottest Country</p>
        </div>
      </div>
    )
  }
}
export default HottestCountry
