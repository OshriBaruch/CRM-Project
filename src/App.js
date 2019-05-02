import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Clients from './components/Clients'
import Actions from './components/Actions'
import Analytics from './components/Analytics'
import Navbar from './components/Navbar'
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = { corrntPage: "" }
  }

  getCorrntPage = (name) => this.setState({ corrntPage: name })

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar corrntPage={this.state.corrntPage}/>
          <Route path="/clients" render={() => <Clients getCorrntPage={this.getCorrntPage} />} />
          <Route path="/actions" render={() => <Actions getCorrntPage={this.getCorrntPage} />} />
          <Route path="/analytics" render={() => <Analytics getCorrntPage={this.getCorrntPage} />} />
        </div>
      </Router>
    );
  }
}

export default App;