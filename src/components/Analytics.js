import React, { Component } from 'react';
import Badges from './analytics/Badges'
import Recharts from './analytics/Recharts'
import axios from 'axios'
import './analytics/Analytics.css';
import Loader from 'react-loaders';

class Analytics extends Component {
  constructor() {
    super();
    this.state = { badges: null, recharts: null }
  }
  async componentDidMount() {
    const analytics = await axios.get('/get_analytics')
    this.setState({
      badges: analytics.data.badges,
      recharts: analytics.data.recharts
    })
    this.props.getCorrntPage("Analytics")
  }
  render() {
    return this.state.badges && this.state.recharts ?
      <div id="analytics">
        <Badges badges={this.state.badges} />
        <Recharts recharts={this.state.recharts} />
      </div>
      : <div>< Loader /></div>
  }
}

export default Analytics