import React, { Component } from 'react';
import NewClients from './badges/NewClients'
import EmailSent from './badges/EmailSent'
import Outstanding from './badges/Outstanding'
import HottestCountry from './badges/HottestCountry'


class Badges extends Component {
    render() {
        let badges = this.props.badges
        return <div className="badges-analytics">
            <NewClients newClients={badges.NewClients}/>
            <EmailSent emailSent={badges.EmailSent}/>
            <Outstanding outstanding={badges.Outstanding}/>
            <HottestCountry hottestCountry={badges.HottestCountry}/>
        </div>
    }
}

export default Badges