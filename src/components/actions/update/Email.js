import React, { Component } from 'react';
import ReactDatalist from 'react-datalist'

class Owner extends Component {
    constructor() {
        super();
        this.state = {
            letters: this.generateLetters(),
            correntLetter: ""
        }
    }
    generateLetters() {
        let letterStatus = []
        for (let i = 65; i < 91; i++) { letterStatus.push(String.fromCharCode(i)) }
        return letterStatus
    }
    setCurrentEmailType = (e) => {
        let letter = e
        this.props.getCorrntEmailType(letter)
        this.setState({
            correntLetter: e
        })
    }

    resetLetter = () => this.setState({ correntLetter: "" })

    sendUpdataData = () => this.props.sendUpdataData()

    render() {
        return (
            <div className="client-actions"><span>Send Email :</span>
                {this.state.correntLetter ?
                    <span><span>{this.state.correntLetter}</span><button onClick={this.resetLetter}>back</button></span> :
                    <ReactDatalist list="email-types"
                        onOptionSelected={this.setCurrentEmailType}
                        options={this.state.letters.map(letter => letter)} />
                }
                <h4 onClick={this.sendUpdataData} style={this.props.style}>SEND</h4>
            </div>
        )
    }

}
export default Owner