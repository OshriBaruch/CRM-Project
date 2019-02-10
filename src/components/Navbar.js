import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Navbar extends Component {
    getCorrntColor = (val, corrntPage) => {
        let obj1 = { background: "#FFD447" }
        let obj2 = { background: "#423E37" }
        if (corrntPage === val) return obj1
        else return obj2
    }

    render() {
        let corrntPage = this.props.corrntPage
        return (
            <div id="navbar">
                <div id="main-links">
                    <Link to="/clients" style={this.getCorrntColor(corrntPage, 'Clients')}><span>Clients</span></Link>
                    <Link to="/actions" style={this.getCorrntColor(corrntPage, 'Actions')}><span>Actions</span></Link>
                    <Link to="/analytics" style={this.getCorrntColor(corrntPage, 'Analytics')}><span>Analytics</span></Link>
                </div>
            </div>
        )
    }
}

export default Navbar