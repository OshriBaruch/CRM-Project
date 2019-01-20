import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Clients from './components/Clients'
import Actions from './components/Actions'
import Analytics from './components/Analytics'
import Navbar from './components/Navbar'
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div id="CRM-main">
            <Route path="/clients" exact render={(match) => <Clients match={match} />} />
            <Route path="/actions" exact render={(match) => <Actions match={match} />} />
            <Route path="/analytics" exact render={(match) => <Analytics match={match} />} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;