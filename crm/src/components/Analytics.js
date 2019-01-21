import React, { Component } from 'react';
import Badges from './analytics/Badges'
import Recharts from './analytics/Recharts'
import axios from 'axios'
import './analytics/Analytics.css';

class Analytics extends Component {
  constructor() {
    super();
    this.state = {
      badges: null,
      recharts: null
    }
  }
  async componentDidMount() {
    const analytics = await axios.get('http://localhost:1996/analytics')
    this.setState({ badges: analytics.data.badges, recharts: analytics.data.recharts })
    this.props.getCorrntPage("Analytics")
  }
  render() {
    return <div id="analytics">
      {this.state.badges ? <Badges badges={this.state.badges} /> : null}
      {this.state.recharts ? <Recharts recharts={this.state.recharts} /> : null}
    </div>
  }
}

export default Analytics