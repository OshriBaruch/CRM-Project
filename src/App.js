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

  // No need for that function, use location.pathname instead
  getCorrntPage = (name) => this.setState({ corrntPage: name })

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar corrntPage={this.state.corrntPage}/>
          <Route path="/clients" exact render={(match) => <Clients getCorrntPage={this.getCorrntPage} match={match} />} />
          <Route path="/actions" exact render={(match) => <Actions getCorrntPage={this.getCorrntPage} match={match} />} />
          <Route path="/analytics" exact render={(match) => <Analytics getCorrntPage={this.getCorrntPage} match={match} />} />
        </div>
      </Router>
    );
  }
}

export default App;