import React, { Component } from 'react';
import axios from 'axios'
import TableRows from './clients/TableRows'
import Popup from './clients/popup'
import TableRowHeader from './clients/TableRowHeader'
import ClientsView from './clients/ClientsView'
import './clients/Clients.css';

class Clients extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            filterData: [],
            changeContact: null,
            correntPage: 0,
            filterClients: { input: "", fild: "name" },
        }
    }

    async componentDidMount() {
        const data = await axios.get('/all_clients')
        this.setState({ data: data.data, filterData: data.data })
        this.props.getCorrntPage("Clients")
    }

    saveClientChangeToDB = async (obj) => {
        let data = await axios.put('/update_client', obj)
        return data.data
    }

    filterByUserInput = () => {
        let filterClients = this.state.filterClients
        let filterData = this.state.data
        filterData = filterData.filter(f => {
            if (filterClients.fild === "sold") { return f.sold }
            if ((filterClients.fild === "emailType") && (!f[filterClients.fild])) { return null }
            let fild = f[filterClients.fild].toLowerCase()
            let input = filterClients.input.toLowerCase()
            return fild.includes(input)
        })
        this.setState({ filterData: filterData, correntPage: 0 });
    }

    filterByUserFild = (change) => {
        let filterClients = this.state.filterClients
        filterClients[change.name] = change.value
        this.setState({ filterClients: filterClients });
        this.filterByUserInput()
    }

    moveToNextPage = () => {
        let corrent = this.state.correntPage
        let dataLangth = this.state.filterData.length
        if ((corrent * 20) + 20 <= dataLangth) { corrent++ }
        this.setState({ correntPage: corrent })
    }

    moveToPreviousPage = () => {
        let corrent = this.state.correntPage
        if ((corrent * 20) - 20 >= 0) { corrent-- }
        this.setState({ correntPage: corrent })
    }

    setClientChange = (index) => {
        this.setState({ changeContact: this.state.filterData[index] })
    }

    savePopupChange = (obj) => {
        let changeContact = this.state.changeContact

        if (obj.name) changeContact.name = obj.name
        if (obj.surname) changeContact.surname = obj.surname
        if (obj.email) changeContact.email = obj.email
        if (obj.country) changeContact.country = obj.country

        if (this.saveClientChangeToDB(changeContact)) {
            let data = [...this.state.data]
            data[changeContact.index] = changeContact
            this.setState({ changeContact: null, data: data })
        }
    }

    closePopUp = () => {
        this.setState({ changeContact: null })
    }

    render() {
        let clients = this.state.filterData
        clients = clients.slice(this.state.correntPage * 20, (this.state.correntPage + 1) * 20)
        return (
            <div id="CRM-main">
                <ClientsView filterByUserFild={this.filterByUserFild}
                    moveNextPage={this.moveToNextPage}
                    movePreviousPage={this.moveToPreviousPage}
                    correntPage={this.state.correntPage}
                    dataLength={this.state.filterData.length / 20}
                    filters={this.state.filterClients} />
                <div id="clients-table">
                    <TableRowHeader />
                    {clients.map((c, index) =>
                        <TableRows
                            key={index}
                            index={index}
                            setClientChange={this.setClientChange}
                            client={c} />
                    )}
                </div>
                {this.state.changeContact &&
                    <Popup closePopUp={this.closePopUp}
                        client={this.state.changeContact}
                        savePopupChange={this.savePopupChange}
                    />
                }
            </div>
        )
    }
}
export default Clients