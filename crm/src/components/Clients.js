import React, { Component } from 'react';
import axios from 'axios'
import Row from './clients/Row'
import Popup from './clients/popup'
import TableHeader from './clients/TableHeader'
import InputComp from './clients/InputComp'
import './clients/Clients.css';

class Clients extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            filterData: [],
            changeContact: null,
            correctPage: 0,
            filterClients: { input: "", fild: "name" },
        }
    }
    async componentDidMount() {
        const data = await axios.get('http://localhost:1996/allClient')
        this.setState({ data: data.data, filterData: data.data })
    }
    saveClientChangeToDB = async (obj) => {
        let data = await axios.put('http://localhost:1996/client', obj)
        return data.data
    }
    filtersData = () => {
        let filterClients = this.state.filterClients
        let filterData = this.state.data
        filterData = filterData.filter(f => {
            if (filterClients.fild === "sold") { return f.sold }
            if ((filterClients.fild === "emailType") && (!f[filterClients.fild])) { return null }
            let fild = f[filterClients.fild].toLowerCase()
            let input = filterClients.input.toLowerCase()
            return fild.includes(input)
        })
        this.setState({ filterData: filterData, correctPage: 0 });
    }
    filterBy = (change) => {
        let filterClients = this.state.filterClients
        filterClients[change.name] = change.value
        this.setState({ filterClients: filterClients });
        this.filtersData()
    }
    moveToNextPage = () => {
        let correct = this.state.correctPage
        let dataLangth = this.state.data.length
        if ((correct * 20) + 20 <= dataLangth) { correct++ }
        this.setState({ correctPage: correct })
    }
    moveToPreviousPage = () => {
        let correct = this.state.correctPage
        if ((correct * 20) - 20 >= 0) { correct-- }
        this.setState({ correctPage: correct })
    }
    catchClientData = (obj, index) => {
        obj.index = index
        this.setState({ changeContact: obj })
    }
    changeData = (obj) => {
        let changeContact = this.state.changeContact
        obj.name ? changeContact.name = obj.name : obj.name = changeContact.name
        obj.surname ? changeContact.surname = obj.surname : obj.surname = changeContact.surname
        obj.email ? changeContact.email = obj.email : obj.email = changeContact.email
        obj.country ? changeContact.country = obj.country : obj.country = changeContact.country
        if (this.saveClientChangeToDB(changeContact)) {
            let data = this.state.data
            data[obj.index] = obj
            this.setState({ changeContact: null, data: data })
        }
        else {
            alert("Not Found Data")
        }
    }
    
    closePop = () => this.setState({ changeContact: null })

    render() {
        let clients = this.state.filterData
        clients = clients.slice(this.state.correctPage * 20, (this.state.correctPage + 1) * 20)
        return <div>
            <InputComp filterBy={this.filterBy}
                moveNextPage={this.moveToNextPage}
                movePreviousPage={this.moveToPreviousPage}
                correctPage={this.state.correctPage}
                dataLength={this.state.filterData.length / 20}
                filters={this.state.filterClients} />
            <div id="clients-menu">
                <TableHeader />
                {clients.map((c, index) => <Row key={index} index={index} catchClientData={this.catchClientData} client={c} />)}
            </div>
            {this.state.changeContact ? < Popup closePop={this.closePop} client={this.state.changeContact} changeData={this.changeData} /> : null}
        </div>
    }
}
export default Clients