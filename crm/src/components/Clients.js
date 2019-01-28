import React, { Component } from 'react';
import axios from 'axios'
import Row from './clients/Row'
import Popup from './clients/popup'
import TableHeader from './clients/TableHeader'
import InputComp from './clients/InputComp'
import './clients/Clients.css';

class Clients extends Component {
    // remove filterData from state. remember that the state should hold the minimal necessary data.
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
        const data = await axios.get('http://localhost:1996/allClient')
        this.setState({ data: data.data, filterData: data.data })
        this.props.getCorrntPage("Clients")
    }
    saveClientChangeToDB = async (obj) => {
        let data = await axios.put('http://localhost:1996/client', obj)
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
        // return filterData
    }
    filterByUserFild = (change) => {
        let filterClients = this.state.filterClients
        filterClients[change.name] = change.value
        this.setState({ filterClients: filterClients });
        this.filterByUserInput()
    }

    // consider creating one function for both - pagination 
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
    // No need for both obj and index, pass only index/id
    setClientChange = (obj, index) => {
        obj.index = index
        this.setState({ changeContact: obj })
    }
    savePopupChange = (obj) => {
        let changeContact = this.state.changeContact
        // check if necessary (maybe you should put null here)
        // obj = updateObjectValues(obj);
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
    closePopUp = () => {
        this.setState({ changeContact: null })
    }
    render() {
        let clients = this.state.filterData
        // let filteredClients = this.filterData()
        clients = clients.slice(this.state.correntPage * 20, (this.state.correntPage + 1) * 20)
        return (
            <div id="CRM-main">
                <InputComp filterByUserFild={this.filterByUserFild}
                    moveNextPage={this.moveToNextPage}
                    movePreviousPage={this.moveToPreviousPage}
                    correntPage={this.state.correntPage}
                    dataLength={this.state.filterData.length / 20}
                    filters={this.state.filterClients} />
                <div id="clients-table">
                    <TableHeader />
                    {clients.map((c, index) =>
                        <Row key={index} index={index} setClientChange={this.setClientChange} client={c} />
                    )}
                </div>
                {this.state.changeContact &&
                    <Popup closePopUp={this.closePopUp} client={this.state.changeContact} savePopupChange={this.savePopupChange} />
                }
            </div>
        )
    }
}
export default Clients