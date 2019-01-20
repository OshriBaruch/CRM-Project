import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Navbar extends Component {
    constructor() {
        super();
        this.state = { background1: null, background2: null, background3: null }
    }
    onCorrectPage = (e) => {
        let name = e.target.name
        let state = this.state
        let obj = { background: "rgb(252, 224, 65)" }

        state.background1 = null
        state.background2 = null
        state.background3 = null

        state[name] = obj
        this.setState(state)
    }

    render() {
        return <div id="main-links">
            <Link to="/clients" onClick={this.onCorrectPage} name={"background1"} style={this.state.background1}>Clients</Link>
            <Link to="/actions" onClick={this.onCorrectPage} name={"background2"} style={this.state.background2} >Actions</Link>
            <Link to="/analytics" onClick={this.onCorrectPage} name={"background3"} style={this.state.background3} >Analytics</Link>
        </div>
    }
}

export default Navbar